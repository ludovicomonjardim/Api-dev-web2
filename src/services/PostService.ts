import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostService {
    constructor() { }

    async insertarPost(post: Prisma.PostCreateInput) {
        try {
            return await prisma.post.create({
                data: post
            });

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async atualizarPost(post: Prisma.PostUpdateInput, id: number) {
        try {
            return await prisma.post.update({
                data: post,
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async trazerPosts() {
        try {
            return await prisma.post.findMany({});

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async deletarPost(id: number) {
        try {
            await prisma.comentario.deleteMany({
                where: {
                    postId: id,
                },
            });
            await prisma.post.delete({
                where: {
                    id: id,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
export default new PostService();