const mongoose = require("mongoose");

const { Schema } = mongoose;

const ArticlesSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
    image: String,
    urlTitle: String,
  },
  { timestamps: true }
);

ArticlesSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    image: this.image,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    urlTitle: this.urlTitle,
  };
};

mongoose.model("Articles", ArticlesSchema);
