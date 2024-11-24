import mongoose from "mongoose";

const DbConnection = ()=>{
mongoose
.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true, 
  // useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected Successfully");


})
.catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1); 
});
}

export default DbConnection