import mongoose from "mongoose";

const apiKeySchema =
new mongoose.Schema({

 name:{
  type:String,
  required:true,
 },

 keyHash:{
  type:String,
  required:true,
 },

 tenantId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Tenant",
  required:true,
 },

 createdAt:{
  type:Date,
  default:Date.now,
 }

});

export default mongoose.model(
 "ApiKey",
 apiKeySchema
);