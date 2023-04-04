import mongoose from "mongoose";

const feedschema = mongoose.Schema({
  auto_name: {
    type: String,
  },
  user: {
    type: String,
  },
  auto_id: {
    type: String,
  },
  feedback: {
    type: String,
  },
});

const FeedModel = mongoose.model("FeedModel", feedschema);
export default FeedModel;
