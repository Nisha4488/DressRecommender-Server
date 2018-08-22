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
}


module.exports = MongodbService;
