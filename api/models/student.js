const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId:{
        type: String,
        require: true,
        unique: true,
    },
    studentName:{
        type: String,
        required: true
    },
    studentPRN:{
        type: String,
        required: true
    },
    studentClass:{
        type: String,
        required: true
    },
  
    contactNumber: {
        type: String,
        trim: true,
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
    },
});

const Student = mongoose.model("Student", studentSchema)

module.exports = Student;