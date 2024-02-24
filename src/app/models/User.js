import { Schema, model, models } from "mongoose";
// import { type } from "os";
// import bcrypt from 'bcrypt';

const UserSchema = new Schema ({
    name : {type : String},
    email : {type : String,required:true,unique:true},
    password : {type : String,required:true,},
    image : {type : String},
    phone: {type :  String},
    City: {type :  String},
    RestaurantName: {type :  String},
    RestaurantAddress: {type :  String},
    PostalCode: {type :  String},
    Country: {type :  String},
    admin: {type: Boolean, default: false}
 },{timestamps: true});


export const User = models?.User || model('User',UserSchema)