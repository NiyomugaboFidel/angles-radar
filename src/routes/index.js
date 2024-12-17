import express from "express";
import Users from "./api/user.routes.js"
import Investor from "./api/investor.routes.js"
import Watchlist from "./api/watchlist.routes.js"
import companyProfile from "./api/companyProfile.routes.js"
import company from "./api/company.routes.js"

const routes = express.Router();

routes.use('/users', Users );
routes.use('/investor', Investor );
routes.use('/watchlist', Watchlist );
routes.use('/', companyProfile  );
routes.use('/company', company);

export default routes