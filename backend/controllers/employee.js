import { cloudinaryImageUploader } from "../helpers/cloudinary.js";
import { Employee } from "../models/Employee.model.js"
export const handleEmployeeCreation = async (req, res) => {
    try {
        const { name, email, phoneno, designation, gender, course } = req.body;
        const profile_image = req.file

        // Validating all fields are provided
        if (!name || !email || !phoneno || !designation || !gender || !course) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Checking if email already exists
        const emailExists = await Employee.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Employee with the same email exists!" });
        }
        // Validating phone number type
        let phonenum;
        if (isNaN(phoneno)) {
            phonenum = parseInt(phoneno)
        }

        // Profile image uploading logic
        console.log(profile_image.path)
        const uploadedFile = await cloudinaryImageUploader(profile_image.path)
        if(uploadedFile.error){
            return res.status(400).json({error: uploadedFile.error, description: uploadedFile.description})
        }


        // Creating new employee instance
        const newEmployee = new Employee({
            name,
            email,
            phoneno: phonenum ? phonenum : phoneno,
            designation,
            gender,
            course,
            profile_image: uploadedFile.result.secure_url, // Use the uploaded image URL
        });

        // Saving to database
        const savedEmployee = await newEmployee.save();
        if (!savedEmployee) {
            return res.status(500).json({ error: "Failed to create employee!" });
        }

        return res.status(201).json({ success: "Successfully created employee!", employee: savedEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
};

export const handleEmployeeUpdation = async (req, res) => {
    try {

        const {employeeId} = req.params
        console.log(employeeId)
        const { name, email, phoneno, designation, gender, course } = req.body;
        let profile_image = req.file?.path

        // Validating all fields are provided
        if (!name || !email || !phoneno || !designation || !gender || !course) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Checking if email already exists
        const employee = await Employee.findById(employeeId);
        console.log(employee)
        if (employee.email !== email) {
            const emailExists = await Employee.findOne({ email });
            if(emailExists){
                return res.status(400).json({ error: "Employee with the same email exists!" });
            }
        }
        // Validating phone number type
        let phonenum;
        if (isNaN(phoneno)) {
            phonenum = parseInt(phoneno)
        }

        // Profile image uploading logic
        
        if(profile_image){
            profile_image = await cloudinaryImageUploader(profile_image)
            if(profile_image.error){
                return res.status(400).json({error: uploadedFile.error, description: uploadedFile.description})
            }
        }


        // Updating new employee instance
        const updatedEmployee = await Employee.findOneAndUpdate({_id: employeeId},{
            name,
            email,
            phoneno: phonenum ? phonenum : phoneno,
            designation,
            gender,
            course,
            profile_image // Use the uploaded image URL
        },{ new: true });

        console.log(updatedEmployee)
        
        if (!updatedEmployee) {
            return res.status(500).json({ error: "Failed to Update an employee!" });
        }

        return res.status(201).json({ success: "Successfully Updated employee!", employee: updatedEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
};
