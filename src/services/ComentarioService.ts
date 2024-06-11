import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComentarioService {
    constructor() { }

    async insertarComentario(comentario: Prisma.ComentarioCreateInput) {
        try {
            return await prisma.comentario.create({
                data: comentario
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async atualizarComentario(comentario: Prisma.ComentarioUpdateInput, id: number) {
        try {
           return await prisma.comentario.update({
                data: comentario,
                where: {
                    id: id
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async deletarComentario(id: number) {
        try {
            await prisma.comentario.delete({
                where: {
                    id: id
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async trazerTodosComentarios() {
        try {
            return await prisma.comentario.findMany({ });
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
export default new ComentarioService();