import express from 'express';

import {
  getSinglePost,
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from '../controllers/posts.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getSinglePost);

router.post('/', authMiddleware, createPost);
router.post('/:id/commentPost', authMiddleware, commentPost);

router.patch('/:id/likePost', authMiddleware, likePost);
router.patch('/:id', authMiddleware, updatePost);

router.delete('/:id', authMiddleware, deletePost);

export default router;
