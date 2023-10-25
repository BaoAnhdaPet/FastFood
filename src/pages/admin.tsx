/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */

import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import AdminContainer from '~/admin/AdminContainer';

const Admin: NextPage = () => {
    const { data: session } = useSession();
    if (session?.user.role === 'Admin') {
        return (
            <>
                <Head>
                    <title>Quản trị viên</title>
                </Head>
                <div className="full-size flex flex-col">
                    <div className="flex ">
                        <AdminContainer />
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            {' '}
            <Head>
                <title>Quản trị viên</title>
            </Head>{' '}
            <div className="absolute-center mt-36 font-primary text-5xl">
                Bạn không phải quản trị viên
            </div>
        </>
    );
};

export default Admin;
