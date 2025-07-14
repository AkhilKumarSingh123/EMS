// import express from "express"
// import cors from "cors"
// import authRouter from "./routes/auth.js"
// import departmentRouter from "./routes/department.js"
// import employeeRouter from "./routes/employee.js"
// import salaryRouter from "./routes/salary.js"
// import leaveRouter from "./routes/leave.js"
// import settingRouter from "./routes/setting.js"
// import dashboardRouter from "./routes/dashboard.js"

// import dotenv from "dotenv";
// import mongoose from "mongoose";
// // import connectToDatabase from './db/db.js'

// dotenv.config();
// // connectToDatabase()

// const app = express();
// const url = process.env.MONGODB_URL;

// // app.use(cors())
// app.use(cors({
//   origin: 'https://ems-p5ma.onrender.com', // ✅ Your frontend URL
//   credentials: true, // ✅ If using cookies or authentication
// }));

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://ems-p5ma.onrender.com'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS not allowed'));
//     }
//   },
//   credentials: true
// }));

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("Database Connection Successfully");
//   })
//   .catch((error) => console.log("Database Error is ", error));


// app.use(express.json())
// app.use(express.static('public/uploads'))

// app.use('/api/auth', authRouter)
// app.use('/api/department', departmentRouter)
// app.use('/api/employee', employeeRouter)
// app.use('/api/salary', salaryRouter)
// app.use('/api/leave', leaveRouter)
// app.use('/api/setting', settingRouter)
// app.use('/api/dashboard', dashboardRouter)


// app.listen(process.env.PORT, () =>{
//     console.log(`App is running on the port ${process.env.PORT}`)
// })



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routers
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL;

// ✅ CORS Configuration (only one, not two)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ems-p5ma.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.static('public/uploads'));

// ✅ API Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

// ✅ MongoDB Connect and Start Server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("✅ Database Connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error.message);
});
