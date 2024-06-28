import { RequestHandler } from "express";
import { db } from "../datastore";
import { Post } from "../types";

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<Res>,
  Partial<Req>,
  any
>;

export const listPostsHandler: ExpressHandler<{}, {}> = (request, response) => {
  response.send({ posts: db.listPosts() });
  // console.log("\nresult:  ", db.listPosts());
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;

interface CreatePostResponse {}

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
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
