import postMessage from '../models/postModel.js';
import mongoose from 'mongoose';

//Create A Post
export const createPost = async (req, res) => {
  try {
    const newPost = await postMessage.create({ ...req.body, creator: req.userId });

    res.status(201).json({
      status: 'success',
      data: {
        postMessages: newPost,
      },
    });
  } catch (err) {
    res.status(409).json({
      message: err,
    });
  }
};

//Read All Post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();

    res.status(200).json({
      status: 'success',
      result: postMessages.length,
      data: {
        postMessages,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
};

//Update an Existing Post
export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const newPost = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({
        status: 'failed',
        message: 'No Such Id Found',
      });

    const updatedPost = await postMessage.findByIdAndUpdate(_id, newPost, { new: true });

    res.status(200).json({
      status: 'success',
      data: {
        updatedPost,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
};

//Deleting a Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        status: 'failed',
        message: 'No Such Id Found',
      });

    res.status(204).json({ status: 'success' });

    await postMessage.findByIdAndDelete(id);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//Like A post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    res.status(400).json({ message: 'Unauthenticated Request' });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      status: 'failed',
      message: 'No Such Id Found',
    });

  const post = await postMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId); //Like The post
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId)); //Dislike the post
  }

  const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json({ status: 'success', data: updatedPost.likes, id });

  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
