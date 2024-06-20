import { Router } from "express";
import UserController from "../controllers/UserController";

const UserRouter = Router();

UserRouter.post("/users", UserController.inserirUsuario);

UserRouter.patch("/users/:id", UserController.atualizarUsuario);

UserRouter.delete("/users/:id", UserController.deletarUsuario);

UserRouter.get("/users", UserController.listaUsuarios);

export default UserRouter;
