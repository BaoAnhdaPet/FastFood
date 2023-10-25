/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { logInState } from '~/atoms/modalAtom';

const Login = () => {
    const [isOpen, setIsOpen] = useAtom(logInState);

    const router = useRouter();

    return (
        <>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />
                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-4 text-5xl font-bold">
                                Đăng nhập
                            </Dialog.Title>
                            <Dialog.Description className="absolute-center my-4 text-2xl">
                                Để có trải nghiệm mua sắm trọn vẹn !!
                            </Dialog.Description>

                            <div className="flex flex-col space-y-6">
                                <button className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-sky-200 md:w-[250px]">
                                    <Image
                                        src="/fb_icon.svg"
                                        alt="Facebook Icon"
                                        width={30}
                                        height={30}
                                    />

                                    <span className="text-base md:text-xl">
                                        Đăng nhập với Facebook
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        signIn('google', {
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            callbackUrl: `${
                                                router.asPath
                                                    ? router.asPath
                                                    : '/'
                                            }`,
                                        })
                                    }
                                    className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-yellow-200 md:w-[250px]"
                                >
                                    <Image
                                        src="/gg_icon.svg"
                                        alt="Facebook Icon"
                                        width={30}
                                        height={30}
                                    />

                                    <span className="text-base md:text-xl">
                                        Đăng nhập với Google
                                    </span>
                                </button>
                                <button
                                    className="absolute-center smooth-effect my-6 font-secondary text-2xl hover:scale-110 hover:text-rose-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Quay lại
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Login;
