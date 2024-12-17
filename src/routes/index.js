import express from "express";
import Users from "./api/user.routes.js"
import Investor from "./api/investor.routes.js"
const routes = express.Router();

routes.use('/users', Users );
routes.use('/investor', Investor );

export default routes