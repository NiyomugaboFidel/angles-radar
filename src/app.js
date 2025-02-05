import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import allRoutes from "./routes/index.js"
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 7000;

const corsOptions = {
    origin: '*', // Replace with your frontend URL
    optionsSuccessStatus: 200,
    credentials: true,
  };
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.get('/', (req, res)=>{
    res.send('Hello word');
})
app.use('/api/v1', allRoutes)


export default app;