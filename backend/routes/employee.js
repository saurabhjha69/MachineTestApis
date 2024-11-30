import { Router } from "express";
import { handleEmployeeCreation,handleEmployeeUpdation } from "../controllers/employee.js";
import { upload } from "../storage/storage.js";

export const employeeRouter = Router()

employeeRouter.post("/",upload.single("profile_image"),handleEmployeeCreation)
employeeRouter.put("/:employeeId",upload.single("profile_image"),handleEmployeeUpdation)