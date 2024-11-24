import app from "./app.js";
import DbConnection from "./utils/mongoose.js";
const PORT = process.env.PORT || 7000;

   DbConnection();
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });