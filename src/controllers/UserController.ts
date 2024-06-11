import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";
import { generateHash } from "../utils/BcryptUtils";
import jwt from 'jsonwebtoken';

class UserController {
  constructor() { }

  async inserirUsuario(req: Request, res: Response) {
    const body = req.body;

    if (!body.email || !body.name || !body.password) {
      return res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    const hashPassword = await generateHash(body.password);

    if (!hashPassword) {
      return res.json({
        status: "error",
        message: "Erro ao criptografar senha ...",
      });
    }

    const token = jwt.sign({ userId: 0 }, "token-jwt", {

    });

    try {
      const novoUsuario = await UserDataBaseService.insertDBUser({
        name: body.name,
        email: body.email,
        password: hashPassword as string,
        token: token
      });
      return res.json({
        status: "OK",
        message: "Guarde o seu token pois você irá precisar dele para consumir os outros métodos.",
        novoUsuario: novoUsuario,
      });

    } catch (error) {
      return res.json({
        status: "error",
        message: error,
      });
    }
  }

  async atualizarUsuario(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { name, email } = req.body;

    if (!email || !name) {
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
      const user = await UserDataBaseService.trazerUsuarioPortoken(token);

      if (user != null) {
        const usuarioAtualizado = await UserDataBaseService.updateDBUser(
          {
            name: name,
            email: email,
          },
          parseInt(id)
        );
        return res.json({
          status: "OK",
          message: usuarioAtualizado,
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

  async deletarUsuario(req: Request, res: Response) {
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
      const user = await UserDataBaseService.trazerUsuarioPortoken(token);
      if (user != null) {

        const resposta = await UserDataBaseService.deleteDBUser(parseInt(id));

        if (resposta) {
          return res.json({
            status: "OK",
            message: "Usuário deletado com sucesso",
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

  async listaUsuarios(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.json({
          status: "error",
          message: "Faltou fornecer o token",
        });
      }
      console.log(token)

      const user = await UserDataBaseService.trazerUsuarioPortoken(token);
      console.log(user)
      if (user != null) {
        const users = await UserDataBaseService.listDBUsers();
        return res.json({
          status: "OK",
          message: users,
        });
      }
      else {
        return res.json({
          status: "error",
          message: 'Token inválido',
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

}

export default new UserController();
