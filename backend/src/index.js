import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import mongoose from 'mongoose';
import {app,server } from './utils/socket.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

const PORT=process.env.PORT;
// console.log(PORT);
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'

}));

app.use(cookieParser());
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({ extended: true,limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.status(200).send('server is running OK!');
})

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);




mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
    .then(()=>{
        console.log('connected to db');
        server.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });

