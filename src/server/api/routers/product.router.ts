/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod';
import { publicProcedure, router } from '~/server/api/trpc';

export const productRouter = router({
    getProduct: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { id } = input;

            return await ctx.prisma.product.findUnique({
                where: { id },
            });
        }),
    getAllProduct: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                orderByTime: z.string().default('asc'),
            }),
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;
            const { orderByTime } = input;

            const items = await ctx.prisma.product.findMany({
                take: limit,
                orderBy: {
                    createdAt: orderByTime,
                },
            });

            return {
                items: items,
            };
        }),
    getRandomProduct: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;

            const items = await ctx.prisma.product.aggregateRaw({
                pipeline: [{ $sample: { size: limit } }],
            });

            return {
                items: items,
            };
        }),
    getCategoryList: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
    findProductBySearch: publicProcedure
        .input(z.object({ title: z.string() }))
        .query(async ({ ctx, input }) => {
            const { title } = input;

            const products = await ctx.prisma.product.findRaw({
                filter: { title: { $regex: `^${title}`, $options: 'i' } },
            });
            return products;
        }),
});
