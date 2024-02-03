import { Schema, model, models } from "mongoose";
// import { type } from "os";
import bcrypt from 'bcrypt';

const UserSchema = new Schema ({
    email : {type : String,required:true,unique:true},
    password : {type : String,required:true, 
        validate: pass=>{
            if (!pass?.length || pass.length<5){
                new Error('Password Is Too Weak')
                return false;
            }
    },
 },
},{timestamps: true});

UserSchema.post('validate',function(user){
    const myPlaintextPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(myPlaintextPassword, salt);

})

export const User = models?.User || model('User',UserSchema)