import { Router } from "express";
import ComentarioController from "../controllers/ComentarioController";

const ComentarioRouter = Router();

ComentarioRouter.post("/comentario/insertar", ComentarioController.insertarComentario);

ComentarioRouter.patch("/comentario/atualizar/:id", ComentarioController.atualizarComentario);

ComentarioRouter.delete("/comentario/deletar/:id", ComentarioController.deletarComentario);

ComentarioRouter.post("/comentario/trazerTodosComentarios", ComentarioController.trazerTodosComentarios);

export default ComentarioRouter;