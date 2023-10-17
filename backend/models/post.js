const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const postSchema = new Schema({
  caption: String,

  image:
  {
    public_id: String,
    path: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  created: {
    type: Date,
    default: new Date(new Date().getDate())
  },
});

const post = mongoose.model("Posts", postSchema);
module.exports = post;
