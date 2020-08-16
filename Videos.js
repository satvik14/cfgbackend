const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  
  c_id: {
    type: Number,
    required: true,
    unique: true,
  },
  video: {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("videos", userSchema);
