import express, { RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(
    "New Request: ",
    req.path,
    "- type: ",
    req.method,
    "- Body: ",
    req.body
  );
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", listPostsHandler);

app.post("/posts", createPostHandler);

app.listen(3333, () => {
  console.log("App is running on port 3333");
});
