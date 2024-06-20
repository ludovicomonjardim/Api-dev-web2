import { Request, Response } from "express";
import ComentarioService from "../services/ComentarioService";
import PostService from "../services/PostService";
import UserDataBaseService from "../services/UserDataBaseService";


class ComentarioControllerController {
    constructor() { }

    async insertarComentario(req: Request, res: Response) {
        const body = req.body;

        if(!body.idPostagem){
            const posts = await PostService.trazerPosts();
            return res.json({
                status: "error",
                message: "Faltou informar o Id da postagem.",
                posts: posts
            });
        }

        if (!body.content) {
            return res.json({
                status: "error",
                message: "Falta parâmetros",
            });
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }
            const usuario = await UserDataBaseService.trazerUsuarioPortoken(token);

            if (usuario != null) {
                const novoComentario = await ComentarioService.insertarComentario({
                    content: body.content,
                    author: {
                        connect: { id: usuario.id },
                    },
                    post: {
                        connect: { id: body.idPostagem }
                    }
                });

                return res.json({
                    status: "OK",
                    message: novoComentario,
                });
            }
            else {
                return res.json({
                    status: "error",
                    message: 'Token inválido',
                });
            }
        } catch (error) {
            return res.json({
                status: "error",
                message: error,
            });
        }
    }
    async atualizarComentario(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            return res.json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        const body = req.body;

        if (!body.content) {
            return res.json({
                status: "error",
                message: "Falta parâmetros",
            });
        }

        try {

            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }

            const usuario = await UserDataBaseService.trazerUsuarioPortoken(token);

            if (usuario != null) {
                const atualizarComentario = await ComentarioService.atualizarComentario(
                    {
                        content: body.content
                    },
                    parseInt(id)
                );

                return res.json({
                    status: "OK",
                    message: atualizarComentario,
                });
            } else {
                return res.json({
                    status: "error",
                    message: 'Token inválido',
                });
            }

        }
        catch (error) {
            return res.json({
                status: "error",
                message: error,
            });
        }
    }
    
    async deletarComentario(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            return res.json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        try {

            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }
            const usuario = await UserDataBaseService.trazerUsuarioPortoken(token);
            if (usuario != null) {

                const resposta = await ComentarioService.deletarComentario(parseInt(id));
                if (resposta) {
                    return res.json({
                        status: "OK",
                        message: "Comentário deletado com sucesso",
                    });
                }
                else{
                    return res.json({
                        status: "error",
                        message: "Comentário não encontrado",
                    });
                }
            }
            else {
                return res.json({
                    status: "error",
                    message: "Token inválido",
                });
            }
        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: error,
            });
        }
    }
    async trazerTodosComentarios(req: Request, res: Response) {

        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }
            const usuario = await UserDataBaseService.trazerUsuarioPortoken(token);

            if (usuario != null) {

                const comentarios = await ComentarioService.trazerTodosComentarios();

                return res.json({
                    status: "OK",
                    message: comentarios,
                  });
            }
            else {
                return res.json({
                    status: "error",
                    message: 'Token inválido',
                });
            }

        } catch (error) {
            return res.json({
                status: "error",
                message: error,
            });
        }
    }
}

export default new ComentarioControllerController();