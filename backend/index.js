import express from "express"
import { connectDB } from "./db.js"
import { loginRouter } from "./routes/login.js"
import { employeeRouter } from "./routes/employee.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/admin",loginRouter)
app.use("/api/employee",employeeRouter)

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server Started To Listen On Port =>",process.env.PORT)
})

