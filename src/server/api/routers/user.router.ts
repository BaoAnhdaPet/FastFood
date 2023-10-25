/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import { userProcedure } from '../procedures';
import { router } from '../trpc';

export const userRouter = router({
    addProductToCart: userProcedure
        .input(
            z.object({
                productId: z.string(),
                cartQuantity: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { productId, cartQuantity } = input;

            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    cart: {
                        create: {
                            product: { connect: { id: productId } },
                            cartQuantity: cartQuantity,
                        },
                    },
                },
            });
            return user;
        }),
    deleteProductFromCart: userProcedure
        .input(z.object({ cartId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { cartId } = input;

            const deletedCart = await ctx.prisma.cart.delete({
                where: { id: cartId },
            });

            return deletedCart;
        }),
    findCartByUser: userProcedure
        .input(z.object({ includeProduct: z.boolean() }))
        .query(async ({ ctx, input }) => {
            const { includeProduct } = input;

            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.session.user.id },
                select: {
                    cart: {
                        include: {
                            product: includeProduct
                                ? {
                                      select: {
                                          slug: true,
                                          image: true,
                                          title: true,
                                          price: true,
                                          categoryName: true,
                                      },
                                  }
                                : includeProduct,
                        },
                        orderBy: { createdAt: 'desc' },
                    },
                },
            });

            return user;
        }),
    findPayments: userProcedure
        .input(z.object({ includeProduct: z.boolean() }))
        .query(async ({ ctx, input }) => {
            const { includeProduct } = input;

            const payments = ctx.prisma.payment.findMany({
                where: { userId: ctx.session.user.id, status: 'SUCCESS' },
                select: {
                    id: true,
                    updatedAt: true,
                    totalAmount: true,
                    shippingStatus: true,
                    addressId: true,
                    paymentDetails: {
                        include: {
                            product: includeProduct
                                ? {
                                      select: {
                                          id: true,
                                          slug: true,
                                          image: true,
                                          title: true,
                                          price: true,
                                      },
                                  }
                                : includeProduct,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return payments;
        }),
    createTicket: userProcedure
        .input(
            z.object({
                issueName: z.string(),
                desc: z.string(),
                paymentId: z.string(),
                productId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { issueName, desc, paymentId, productId } = input;

            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    ticket: {
                        create: {
                            payment: { connect: { id: paymentId } },
                            product: { connect: { id: productId } },
                            ticketIssue: { connect: { name: issueName } },
                            desc: desc,
                        },
                    },
                },
            });
            return user;
        }),
    getTicketIssue: userProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticketIssue.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
    findTickets: userProcedure
        .input(
            z.object({
                includeProduct: z.boolean(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const tickets = ctx.prisma.ticket.findMany({
                where: { userId: ctx.session.user.id },
                select: {
                    desc: true,
                    note: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    ticketIssueName: true,
                    payment: {
                        select: {
                            id: true,
                            updatedAt: true,
                        },
                    },
                    product: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return tickets;
        }),
    addNewAddress: userProcedure
        .input(
            z.object({
                name: z.string(),
                phone: z.string(),
                home: z.string(),
                province: z.string(),
                district: z.string(),
                ward: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { name, phone, home, province, district, ward } = input;

            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    address: {
                        create: {
                            name: name,
                            phone: phone,
                            home: home,
                            province: province,
                            district: district,
                            ward: ward,
                        },
                    },
                },
            });
            return user;
        }),
    findAddress: userProcedure.query(async ({ ctx }) => {
        const addresses = await ctx.prisma.address.findMany({
            where: { userId: ctx.session.user.id },
            select: {
                id: true,
                name: true,
                phone: true,
                home: true,
                province: true,
                district: true,
                ward: true,
            },
        });
        return addresses;
    }),
    findPaymentAddress: userProcedure
        .input(z.object({ data: z.string() }))
        .query(async ({ ctx, input }) => {
            const { data } = input;

            const address = await ctx.prisma.address.findUnique({
                where: { id: data },
                select: {
                    name: true,
                    phone: true,
                    home: true,
                    province: true,
                    district: true,
                    ward: true,
                },
            });
            return address;
        }),
    findDefaultAddress: userProcedure.query(async ({ ctx }) => {
        const addresses = await ctx.prisma.address.findFirst({
            where: { userId: ctx.session.user.id },
            select: {
                id: true,
                name: true,
                phone: true,
                home: true,
                province: true,
                district: true,
                ward: true,
            },
        });
        return addresses;
    }),
    deleteAddress: userProcedure
        .input(z.object({ addressId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { addressId } = input;

            const deleteAddress = await ctx.prisma.address.delete({
                where: { id: addressId },
            });

            return deleteAddress;
        }),
});
