import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, 'A Memory Must have a Title'],
  },

  message: String,
  name: String,
  creator: String,
  tags: [String],

  selectedFile: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postMessage = new mongoose.model('postMessage', postSchema);

export default postMessage;
