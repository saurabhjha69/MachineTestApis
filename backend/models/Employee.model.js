import mongoose from "mongoose";

const EmployeeModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is Required"]
    },
    email: {
        type: String,
        required: [true,"Phone number is required"],
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phoneno: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        enum: ['HR','SALES','MANAGER','None'],
        required: [true,"Desgination is required!"]
    },
    gender: {
        type: String,
        enum: ['Male','Female','Rather Not Specify'],
        required: [true,"gender is required!"]
    },
    course: {
        type: String,
        enum: ['MCA','BCA','BSC','BTECH','MTECH'],
        required: [true,"Course is required!"]
    },
    profile_image: {
        type: String,
        required: [true,"Profile Picture is required!"]
    },
},{
    timestamps: true
})


export const Employee = mongoose.model("Employee",EmployeeModel)