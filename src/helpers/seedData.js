import mongoose from "mongoose"
import dotenv from 'dotenv'
import faker from '@faker-js/faker'
import Customer from "../models/Customer.js"
import Discount from "../models/Discount.js"

dotenv.config()

mongoose
  .connect(
    "mongodb+srv://physicist1:physicist1@cluster0.uvzxt.mongodb.net/habari?authSource=admin&replicaSet=atlas-bkkxd1-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  )
  .then(() => {
    console.log("Mongodb connection open!!!");
  })
  .catch((error) => {
    console.log(error);
  });


// for (let i = 0; i < 15; i++) {

  const userType = [
    "affiliate",
    "employee",
    "customer",
  ];

  const userName = [
    "Paul",
    "Peter",
    "Bob",
    "Babs",
    "Manuel",
    "Tola",
    "Bola",
    "Thoraf",
    "Rayne",
    "Victor",
  ];

  const random = Math.floor(Math.random() * userType.length);
  const randomName = Math.floor(Math.random() * userName.length); 

  var seedCustomers = [
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
    {
      name: userName[randomName],
      user_type: userType[random],
      date_created: new Date(),
    },
  ];
// }

var seedDb = async () => {
  await Customer.deleteMany({});
  await Customer.insertMany(seedCustomers);
};

seedDb().then(() => {
  mongoose.connection.close();
});