/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as trpc from '@trpc/server';
import { Role } from '@prisma/client';
import { publicProcedure } from './trpc';

export const userProcedure = publicProcedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            ...ctx,
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});

export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    const isAdmin = !!ctx.prisma.user.findFirst({
        where: {
            id: ctx.session.user.id,
            role: Role.Admin,
        },
    });
    if (!isAdmin) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
        ctx: {
            ...ctx,
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
