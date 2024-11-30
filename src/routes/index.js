import express from "express";
import Users from "./api/user.routes.js"
import Accounts from "./api/account.routes.js"
const routes = express.Router();

routes.use('/users', Users );
routes.use('/account', Accounts );
export default routes