import express from "express";
import Users from "./api/user.routes.js"
const routes = express.Router();

routes.use('/users', Users );
export default routes