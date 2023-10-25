import { productRouter } from './routers/product.router';
import { router } from '~/server/api/trpc';
import { userRouter } from './routers/user.router';
import { adminRouter } from './routers/admin.router';

export const appRouter = router({
    user: userRouter,
    admin: adminRouter,
    product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
