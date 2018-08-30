const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const StreamingS3 = require('streaming-s3');
const uuidv1 = require('uuid/v1');
const MongodbService = require('./MongodbService');
const mongodbService = new MongodbService();
const config = require('config');
const s3 = config.get('s3');
console.log('s3 ', s3)

const typeDefs = gql`
  # Custom, your own written schema type
  type User {
    _id: String
    name: String
    email: String
    password: String
  }

  input UserInput {
    _id: String
    name: String
    email: String
    password: String
  }

  type Cloth{
    _id: String
    userId: String
    image: String
    type: String
    color: String
    weather: String
  }

  input ClothInput{
    _id: String
    userId: String
    image: String
    type: String
    color: String
    weather: String
  }

  type Outfit{
    _id: String
    userId:String
    clothesId:[String]
    clothes: [Cloth]
    weather:[String]
    occassion:[String]
    lastWornDate: String
  }

 input OutfitInput{
   _id: String
   userId:String
   clothesId:[String]
   weather:[String]
   occassion:[String]
   lastWornDate: String
 }

type File{
  id: ID!
  path: String!
  filename: String!
  mimetype:String!
  encoding: String!
 }

type Query {
  getClothes(userId: String):[Cloth]
  getOutfits(userId:String, clothesId:String):[Outfit]
  getRecommendations(userId:String):[Outfit]
}

type Mutation {
  registerUser(user:UserInput): User
  loginUser(user:UserInput): User
  saveCloth(cloth:ClothInput): Cloth
  saveOutfit(outfit:OutfitInput):Outfit
  deleteCloth(_id:String):Cloth
  deleteOutfit(_id:String):Outfit
  uploadSingleFile(file:Upload!): File!
}
`;

const storeFS=({stream, filename})=>{
  const path =`./upload/${filename}`
  return new Promise((resolve, reject)=>
     stream
     .on('error', error=>{
       if(stream.truncated)
       fs.unlinkSync(path)
       reject(error)
     })
     .pipe(fs.createWriteStream(path))
     .on('error', error=>reject(error))
     .on('finish', ()=>resolve({path}))
  )
}


const resolvers = {
  Query: {
    getClothes: async (root, args)=> { //if your data remain as it is post query
      await mongodbService.init()
      return mongodbService.getClothes(args.userId);
   },
   getOutfits: async(root, args)=>{
     await mongodbService.init()
     return  await mongodbService.getOutfits(args.userId);
   },
   getRecommendations: async(root, args)=>{
     await mongodbService.init()
     return mongodbService.getRecommendations(args.userId);
   }
},

  Mutation: {             // in case if your data changes from initial one post query
    registerUser: async (root, payload)=>{
      console.log(payload)
      await mongodbService.init();
      await mongodbService.addUser(payload.user);
      return await mongodbService.getUserByEmail(payload.user.email)
    },

    loginUser: async (root, payload)=>{
      await mongodbService.init();
      const existingUser = await mongodbService.getUserByEmail(payload.user.email);
      console.log('existingUser', existingUser)
      if(!existingUser){
        throw new Error('Invalid Email')
      }
      if(payload.user.password===existingUser.password){
        return existingUser;
      }
      else{
        throw new Error('Invalid Email or Password. Try again');
      }
    },

    uploadSingleFile: async(root,{file})=>{
      const {stream, mimetype, filename} = await file;
      console.log('upload file for filename ', filename)
      const fileId = uuidv1();
      // await storeFS({stream, filename})

      return new Promise((resolve, reject) => { // eslint-disable-line compat/compat
         new StreamingS3(stream, // eslint-disable-line no-new
           { accessKeyId: s3.accessKeyId, secretAccessKey: s3.secretAccessKey },
           {
             Bucket: s3.bucketName,
             Key: fileId,
             ContentType: mimetype,
             ACL: 'public-read',
           }, (err, resp, stats) => {
             if (err) {
               console.log('Upload error: ', err);
               reject(err);
             }
             console.log('Upload stats: ', stats);
             console.log('Upload path: ', resp.Location);
             resolve({ path: resp.Location });
           });
       });
     },

    saveCloth: async(root,payload)=>{
      await mongodbService.init();
      await mongodbService.addCloth(payload.cloth)
      return await mongodbService.getClothesByImage(payload.cloth.image)   // find cloth and return
    },

    saveOutfit: async(root,payload)=>{
      await mongodbService.init();
      await mongodbService.addOutfit(payload.outfit)
      console.log('payload.outfit ', payload.outfit)
      return await mongodbService.getOutfitsById(payload.outfit._id)
    },

    deleteCloth: async (root, payload)=>{
    // call mongodb to perform delete operation
      await mongodbService.init();
      await mongodbService.deleteCloth(payload._id)
      return {_id: payload._id}
    },

    deleteOutfit: async (root, payload)=>{
      // call mongodb to perform delete operation
      await mongodbService.init();
      await mongodbService.deleteOutfit(payload._id)
      return {_id: payload._id}
    },
  },
 Outfit: {
   clothes: async (root, args)=> { //if your data remain as it is post query
     await mongodbService.init();
     return await mongodbService.getClothesByIds(root.clothesId);
   }
 },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
