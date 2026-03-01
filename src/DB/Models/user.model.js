import mongoose from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../Utils/Enums/user.enum.js";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"First name is required"],
        minLength: [2,"Must be at least 2 letters, you entered only {VALUE}"],
        maxLength: [25,"Must be less than 25 letters, you entered {VALUE}"],
    },
      lastName: {
        type: String,
        required: [true,"Last name is required"],
        minLength: [2,"Must be at least 2 letters, you entered only {VALUE}"],
        maxLength: [25,"Must be less than 25 letters, you entered {VALUE}"],
    },
    email: {
        type: String,
        unique:true,//unique compared to what? database or something else? if db, does this mean it accesses the db without me wanting it to?
        required: true
    },
    password: {
        type: String,
        required: function(){
            return this.providerEnum==providerEnum.SYSTEM;
        }
    },
    DOB:Date,

     phone:{
        type: String,
    },

    role:{
        type: Number,
        enum: Object.values(roleEnum),
        default: roleEnum.USER
    },
    provider:{
        type: Number,
       enum: Object.values(providerEnum),
       default:providerEnum.SYSTEM
    },
    confirmEmail:Date,
    profilePicture:String,
    gender: {
        type: Number,
        enum:Object.values(genderEnum),
        default: genderEnum.MALE,
    },
}, { timestamps: true,toJSON: { virtuals: true } ,toObject: { virtuals: true } });


userSchema.virtual('userName').set(function(value) {
const {firstName,lastName} = value.split(' ')||[];
this.set(firstName,lastName);
}).get(function() {
return this.firstName + ' ' + this.lastName;
});


const userModel=mongoose.model('user',userSchema);
export default userModel;