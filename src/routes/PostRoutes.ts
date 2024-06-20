import { Router } from "express";
import PostController from "../controllers/PostController";

const PostRouter = Router();

PostRouter.post("/post/insertar", PostController.insertarPost);

PostRouter.patch("/post/atualizar/:id", PostController.atualizarPost);

PostRouter.delete("/post/deletar/:id", PostController.deletarPost);

PostRouter.post("/post/trazerTodosPosts", PostController.trazerTodosPosts);

export default PostRouter;
