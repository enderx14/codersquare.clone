import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";

export const listPostsHandler: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = (request, response) => {
  response.send({ posts: db.listPosts() });
  // console.log("\nresult:  ", db.listPosts());
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send("Title field is required, but missing");
  }
  if (!req.body.url) {
    return res.status(400).send("URL field is required, but missing");
  }
  if (!req.body.userId) {
    return res.status(400).send("userID field is required, but missing");
  }

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.createPost(post);
  // console.log("post: ", db.getPost(post.id));
  res.sendStatus(200);
};
