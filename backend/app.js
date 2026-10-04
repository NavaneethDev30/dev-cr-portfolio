import express from "express"
import { PORT,NODE_ENV } from "./config/env.js";
import UserRoute from "./routes/auth.users.js";
import authRouter from "./routes/auth.route.js";
import ContactRoute from "./routes/contact.auth.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";


import cors from "cors";

const app=express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/contact', ContactRoute);

app.use(errorMiddleware)

app.use('/',(req,res)=>{
res.send("Hi ! welcome ")
})

app.use(errorMiddleware);

app.listen(PORT,async()=>{
    console.log(`API is running successfuly om http://localhost:${PORT}`)
    await connectToDatabase();
    console.log(`connected to database in ${NODE_ENV}`)
})








export default app
