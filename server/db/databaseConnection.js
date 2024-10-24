import mongoose from "mongoose";

let cachedConnection = null;

const connectMongo = async () => {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection.");
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL); 

    cachedConnection = conn;  
    console.log("MongoDB connected:", conn.connection.host);

    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error(error.message);  
  }
};

export default connectMongo;
