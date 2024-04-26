import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required: true,
        min: 6,
    },

});


const feedbackSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,

    },
    
    courseName :{
        type: String,
        required: true,
    },

    courseLoad :{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    courseDifficulty :{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    
    courseFeedback:{
        type: String,
    },

});

const ratingSchema = new mongoose.Schema({
    qtype : {
        type: String, 
        required : true,
    },
    query : {
        type: String, 
        required : true,
    },
    response : {
        type: String, 
        required : true,
    },
    rating : {
        type: Number, 
        required : true,
    },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema)
export const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema)