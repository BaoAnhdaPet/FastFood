const Footer = () => {
    return (
        <>
            <footer className="absolute-center h-32 border-t-[1px]  border-gray-300 bg-[#F3F2EC] font-secondary font-medium md:h-24">
                <div className="mx-auto w-4/5 md:flex md:items-center md:justify-between">
                    <span className="absolute-center ml-4 text-center text-xl text-gray-600 dark:text-gray-400">
                        © 2022 Copyright by Luna Keebs
                    </span>
                    <ul className="absolute-center mt-4 flex-wrap text-xl text-gray-500  dark:text-gray-400 sm:mt-0">
                        <li>
                            <a
                                href="#"
                                className="mr-4 hover:underline hover:underline-offset-4 md:mr-6 "
                            >
                                Về chúng tôi
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="mr-4 hover:underline hover:underline-offset-4 md:mr-6"
                            >
                                Chính sách
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="mr-4 hover:underline hover:underline-offset-4 md:mr-6"
                            >
                                Câu hỏi thường gặp
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};
export default Footer;
