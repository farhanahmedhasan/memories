import postMessage from '../models/postModel.js';
import mongoose from 'mongoose';

//params ---> /posts/12323  --> id = 12323 (Populates the id variable)
//Query  ---> /posts?page=1 --> page=1 (pageVariable = 1)

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
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //Get the starting Index of every Page
    const total = await postMessage.countDocuments({});

    const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({
      status: 'success',
      currentPage: Number(page),
      totalPages: Math.ceil(total / LIMIT),
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
};

//Get a single post
export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await postMessage.findById(id);

    res.status(200).json({
      singlePost,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

//Get post By Search
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');

    const post = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(404).json({ message: error.message });
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

//Commenting on a Post
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const post = await postMessage.findById(id);
    post.comments.push(value);

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost.comments);
  } catch (error) {}
};
