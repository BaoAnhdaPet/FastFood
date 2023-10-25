import { type NextPage } from 'next';

import { PATHS } from '~/constants';
import Link from 'next/link';

const PaymentStatus: NextPage = () => {
    return (
        <>
            <div className="mx-auto min-h-screen w-full pt-24 md:max-w-[720px] lg:max-w-[1200px]">
                <div className="absolute-center mt-auto w-full flex-col space-y-8">
                    <h1 className="text-4xl font-bold md:text-4xl">
                        Thanh toán thành công!
                    </h1>

                    <div className="absolute-center w-full space-x-6">
                        <button className="btn-follow-theme btn-lg btn text-2xl hover:text-blue-500">
                            <Link href="/account">
                                Đến trang thông tin tài khoản
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentStatus;
