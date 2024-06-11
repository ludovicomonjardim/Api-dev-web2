import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
    constructor() {

    }

    async signIn(loginUsuario: Prisma.UserWhereInput) {
        try {
            return await prisma.user.findFirst({
                where: {
                    OR:[
                        {name: loginUsuario.name},
                        {email: loginUsuario.email}
                      ]
                }
            });

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new AuthService();