import express, { ErrorRequestHandler, RequestHandler } from "express";
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

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Uncaught Exception", err);
  return res
    .status(500)
    .send("Oops, an unexpected error had occured, please try again");
};

app.use(errHandler);

app.listen(3333, () => {
  console.log("App is running on port 3333");
});
