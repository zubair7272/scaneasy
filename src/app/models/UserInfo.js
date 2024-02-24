import {model, models, Schema} from "mongoose";

const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  phone: {type :  String},
  City: {type :  String},
  RestaurantName: {type :  String},
  RestaurantAddress: {type :  String},
  PostalCode: {type :  String},
  Country: {type :  String},
  admin: {type: Boolean, default: false}
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);