const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const MongodbService = require('./MongodbService');
const mongodbService = new MongodbService();

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

  type File{
    id: ID!
    path: String!
    filename: String!
    mimetype:String!
    encoding: String!
  }

  type Query {
    clothes(userId: String):[Cloth]
  }

  type Mutation {
    registerUser(user:UserInput): User
    loginUser(user:UserInput): User
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
     clothes: (root, args, context, info) => {
       console.log('args', args);
       // Write mongodb to fetch clothese details based on userId

       return [
         {_id: '2323', userId:'333333', image: 'https://i.pinimg.com/564x/44/3d/a4/443da438e31dd9de5b23752e171ad4f7.jpg', color:'red', type:'shirt', weather:'summer'},
         {_id: '2324', userId:'333333', image: 'https://i.pinimg.com/564x/44/3d/a4/443da438e31dd9de5b23752e171ad4f7.jpg', color:'green', type:'shirt', weather:'summer'},
         {_id: '2326', userId:'333333', image: 'https://i.pinimg.com/564x/44/3d/a4/443da438e31dd9de5b23752e171ad4f7.jpg', color:'yello', type:'shirt', weather:'summer'},
         {_id: '2328', userId:'333333', image: 'https://i.pinimg.com/564x/44/3d/a4/443da438e31dd9de5b23752e171ad4f7.jpg', color:'orange', type:'shirt', weather:'summer'}
       ]
     },
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
      console.log('upload file for mimetype ', mimetype)
      const {path}= await storeFS({stream, filename})
      return {path};

}


  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
