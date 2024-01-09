const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://siddheshchaudhari910:Siddheshc2607@cluster0.yvggmyi.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log("Error connecting to MongoDB", error);
});


app.listen(port, () => {
    console.log("Server is running on port 8000")
});

const Student = require("./models/student");
const Attendance = require("./models/attendance");


//endpoint for registering the student
app.post("/addStudent", async (req, res) => {
    try {
        const { studentId,
            studentName,
            studentPRN,
            studentClass,
            contactNumber,
            email
        } = req.body;

        //create a new Student
        const newStudent = new Student({
            studentId,
            studentName,
            studentPRN,
            studentClass,
            contactNumber,
            email
        });

        await newStudent.save();
        res.status(201).json({ message: "Student saved successfully", student: newStudent })

    } catch (error) {
        console.log("Error creating Student", error);
        res.status(500).json({ message: "Failed to add a student" });
    }
});

  


//endpoint for fetching the students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the students" });
    }
})


// endpoint for submitting attendance
  app.post("/attendance", async (req, res) => {
    try {
      const attendanceData = req.body;
  
      for (const record of attendanceData) {
        const { studentId, studentName, date, status } = record;
  
        const existingAttendance = await Attendance.findOne({ studentId, date });
  
        if (existingAttendance) {
          existingAttendance.status = status;
          await existingAttendance.save();
        } else {
          const newAttendance = new Attendance({
            studentId,
            studentName,
            date,
            status,
          });
          await newAttendance.save();
        }
      }
  
      res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
      console.log("error updating attendance", error);
      res.status(500).json({ message: "Error updating attendance" });
    }
  });


// getting attendance
app.get("/attendance", async (req, res) => {
    try {
        const { date } = req.query;
        const attendance = await Attendance.find({ date: date });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error while getting the attendance" })
    }
});

// //getting report

//   app.get("/attendance-report-all-students", async (req, res) => {
//       try {
//         const { month, year } = req.query;
    
//         console.log("Query parameters:", month, year);
//         // Calculate the start and end dates for the selected month and year
//         const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
//           .startOf("month")
//           .toDate();
//         const endDate = moment(startDate).endOf("month").toDate();
    
//         // Aggregate attendance data for all students and date range
//         const report = await Attendance.aggregate([
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   {
//                     $eq: [
//                       { $month: { $dateFromString: { dateString: "$date" } } },
//                       parseInt(req.query.month),
//                     ],
//                   },
//                   {
//                     $eq: [
//                       { $year: { $dateFromString: { dateString: "$date" } } },
//                       parseInt(req.query.year),
//                     ],
//                   },
//                 ],
//               },
              
//             },
//           },
    
//           {
//             $group: {
//               _id: "$studentId",
//               present: {
//                 $sum: {
//                   $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
//                 },
//               },
//               absent: {
//                 $sum: {
//                   $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
//                 },
//               },
//             },
//           },
//           {
//             $lookup: {
//               from: "students", // Name of the student collection
//               localField: "_id",
//               foreignField: "studentId",
//               as: "studentDetails",
//             },
//           },
//           {
//             $unwind: "$studentDetails", // Unwind the studentDetails array
//           },
//           {
//             $project: {
//               _id: 1,
//               present: 1,
//               absent: 1,
//               name: "$studentDetails.studentName",
//               studentId: "$studentDetails.studentId",
//             },
//           },
//         ]);
    
//         res.status(200).json({ report });
//       } catch (error) {
//         console.error("Error generating attendance report:", error);
//         res.status(500).json({ message: "Error generating the report" });
//       }
//     });
    
  app.get("/attendance-report-all-students", async (req, res) => {
    try {
      const { month, year } = req.query;
  
      console.log("Query parameters:", month, year);
  
      // Calculate the start and end dates for the selected month and year
      const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
        .startOf("month")
        .toDate();
      const endDate = moment(startDate).endOf("month").toDate();
  
      // Aggregate attendance data for all students and date range
      const report = await Attendance.aggregate([
        {
          $match: {
            date: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: "$studentId",
            present: {
              $sum: {
                $cond: { if: { $eq: ["$status", "Present"] }, then: 1, else: 0 },
              },
            },
            absent: {
              $sum: {
                $cond: { if: { $eq: ["$status", "Absent"] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $lookup: {
            from: "students", // Name of the student collection
            localField: "_id",
            foreignField: "studentId",
            as: "studentDetails",
          },
        },
        {
          $unwind: "$studentDetails", // Unwind the studentDetails array
        },
        {
          $project: {
            _id: 1,
            present: 1,
            absent: 1,
            name: "$studentDetails.studentName",
            studentId: "$studentDetails.studentId",
          },
        },
      ]);
  
      res.status(200).json({ report });
    } catch (error) {
      console.error("Error generating attendance report:", error);
      res.status(500).json({ message: "Error generating the report" });
    }
  });
  