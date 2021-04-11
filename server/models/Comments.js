const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentsSchema = new Schema(
  {
    text: String,
    username: String,
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
    },
  },
  { timestamps: true }
);

CommentsSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    text: this.text,
    username: this.username,
    article: this.article,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model("Comments", CommentsSchema);
