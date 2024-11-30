import { Router } from "express";
import { handleAdminLogin, handleAdminRegister } from "../controllers/login.js";

export const loginRouter = Router()

loginRouter.post("/login",handleAdminLogin)
loginRouter.post("/register",handleAdminRegister)
loginRouter.get("/",(req,res)=>{
    return res.send("Hey Admin Timepass")
})

