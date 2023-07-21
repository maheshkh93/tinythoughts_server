import mongoose from "mongoose";

const connectToDb = () =>
  mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.tineio0.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: "tiny_thoughts",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

export default connectToDb;
