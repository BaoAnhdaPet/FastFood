import type { NextPage } from 'next';
import Head from 'next/head';
import UserContainer from '~/components/shared/UserContainer';

const Account: NextPage = () => {
    return (
        <>
            <Head>
                <title>Tài khoản</title>
            </Head>
            <div className="full-size flex flex-col">
                <div className="flex ">
                    <UserContainer />
                </div>
            </div>
        </>
    );
};

export default Account;
