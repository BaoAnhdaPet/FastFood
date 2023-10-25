import Link from 'next/link';

const NotFound = () => {
    return (
        <>
            <div className="full-size">
                <div className="full-size absolute-center my-auto mt-40 flex-col font-primary">
                    <div className="absolute-center text-9xl font-bold text-rose-600">
                        404
                    </div>
                    <div className="mt-16 text-3xl font-bold">
                        Không tìm thấy trang bạn yêu cầu!!!
                    </div>
                    <div className="mt-12">
                        <Link href="/">
                            <button className="absolute-center my-8 h-[45px] w-56 overflow-hidden rounded-xl border-2 border-black font-secondary text-[1.625rem] font-medium text-black hover:bg-black hover:text-white">
                                Về trang chủ
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
