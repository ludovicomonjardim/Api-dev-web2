import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { validateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() { }

    async signIn(req: Request, res: Response) {
        const body = req.body;

        if (!body.email || !body.password) {
            return res.json({
                status: "error",
                message: "Falta parâmetros",
            });
        }

        try {
            const user = await AuthService.signIn({
                email: body.email,
                name: body.name,
            });

            if (!user) {
                return res.json({
                    status: "error",
                    message: "Usuário não encontrado",
                });
            }

            const isPasswordValid = await validateHash(body.password, user.password);
            
            if (!isPasswordValid) {
                return res.json({
                    status: "error",
                    message: "Senha incorreta",
                });
            }

            return res.json({
                status: "OK",
                Token_Acesso: user.token,
            });
        } catch (error) {
            return res.json({
                status: "error",
                message: error,
            });
        }
    }

}
export default new AuthController();
