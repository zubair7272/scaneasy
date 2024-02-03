import { Schema, model, models } from "mongoose";
// import { type } from "os";

const UserSchema = new Schema ({
    email : {type : String,required:true,unique:true},
    password : {type : String,required:true, 
        validate: pass=>{
            if (!pass?.length || pass.length<5){
                new Error('Password Is Too Weak')
            }
    },
 },

},{timestamps: true});

export const user = models?.User || model('User',UserSchema)