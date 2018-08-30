const { MongoClient, ObjectId } = require('mongodb');
const dbName = "dressRecommender";
const url = "mongodb://localhost:27017";

class MongodbService{
  async init(){
    const client = await MongoClient.connect(url);
    this.db = client.db(dbName);
  }

  async getAllUsers(){
     const allUsers = await this.db.collection('users').find({}).toArray();
     return   allUsers;
  }

  async getOneUser(userId){
    const findUser = await this.db.collection('users').findOne({_id: ObjectId(userId)});
    return findUser;
  }

  async getUserByEmail(email){
    const findUser = await this.db.collection('users').findOne({email: email});
    return findUser;
  }

  async addUser(user){
    const newUser =  await this.db.collection('users').findOneAndUpdate(
        {email: user.email},
        {$set: user},
        {upsert: true});
  }

  async updateUser(userId, userObject){
    console.log('updateUser userId >> ', userId)
    console.log('updateUser userObject >> ', userObject)
    const updatedUser = await this.db.collection('users').findOneAndUpdate(
      {_id:  ObjectId(userId)},
      {$set: userObject},
      {returnNewDocument: true})
    return updatedUser;
}

async deleteUser(userId){
   const removeUser =await this.db.collection('users').deleteOne({_id:ObjectId(userId)})
}

async getClothes(userId){
    const findClothes = await this.db.collection('clothes').find({userId}).toArray();
    return findClothes;
}

async getClothesByImage(image){
   const findImage = await this.db.collection('clothes').findOne({image})
   return findImage;
}

async getClothesByIds(clothesId){
  const idAsObjectId = clothesId.map(_id =>ObjectId(_id));
  const findClothes = await this.db.collection('clothes').find({_id: {$in: idAsObjectId}}).toArray();
  return findClothes;
  }

async addCloth(cloth){
  const newCloth= await this.db.collection('clothes').findOneAndUpdate(
    {image: cloth.image},
    {$set:cloth},
    {upsert:true});
}

async deleteCloth(clothId){
  const removeCloth =await this.db.collection('clothes').deleteOne({_id:ObjectId(clothId)})
}

async getOutfits(userId){
  const findOutfits= await this.db.collection('outfits').find({userId}).sort({_id: -1}).toArray();
  return findOutfits;
}

async getOutfitsById(_id){
  const findId = await this.db.collection('outfits').findOne({_id})
  return findId;
}

async addOutfit(outfit){
  const outfitId = outfit._id;
  delete outfit._id;
  const newOutfit= await this.db.collection('outfits').findOneAndUpdate(
    {_id: ObjectId(outfitId)},
    {$set:outfit},
    {upsert:true}
  )
}

async deleteOutfit(outfitId){
  const removeOutfit =await this.db.collection('outfits').deleteOne({_id:ObjectId(outfitId)})
}

async getRecommendations(userId){
  // Find current time
  // Categorize current time with occasion
  // Filter based on occassion
  const findRecommendations= await this.db.collection('outfits').find({userId}).toArray();
  return findRecommendations.filter(r => !r.lastWornDate);
  }
}

module.exports = MongodbService;
