import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {

    await mongoose.connect(process.env.monodbUri+process.env.dbname).then(()=>{
        console.log("Database Connected Successfully!")
    }).catch((err)=> {
        console.error("Database Connection failed! ", err)
    })
}

