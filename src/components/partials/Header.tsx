import Logo from '~/components/icons/Logo';
import Link from 'next/link';
import DesktopNavigation from '~/components/partials/DesktopNavigation';
import Login from '~/components/modal/Login';
import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { memo } from 'react';
import MobileNavigation from './MobileNavigation';
import { useSession } from 'next-auth/react';
import UserMenu from '../modal/UserMenu';
import { useCartContext } from '~/providers/CartContextProvider';
import {
    logInState,
    navbarState,
    searchProductState,
    shoppingCartState,
    userMenuState,
} from '~/atoms/modalAtom';
import { useAtom } from 'jotai';
import ShoppingCart from '../modal/ShoppingCart';
import SearchModal from '../modal/SearchModal';
// import useShoppingCart from '~/context/ShoppingCartContext';

const Header = () => {
    const [isLogin, setIsLogin] = useAtom(logInState);
    const [isOpen, setIsOpen] = useAtom(userMenuState);
    const [isCartOpen, setIsCartOpen] = useAtom(shoppingCartState);
    const [isSearch, setIsSearch] = useAtom(searchProductState);

    const { data: session } = useSession();
    const cartCtx = useCartContext();

    return (
        <>
            <header className="absolute-center h-48 w-full bg-black font-primary md:h-[12rem]">
                <div className="absolute-center w-full flex-col lg:flex ">
                    <div className="absolute-center flex h-44 w-[90%] lg:w-[80%]">
                        <div className="flex h-full w-full items-center lg:hidden">
                            <MobileNavigation />
                        </div>
                        {/* Logo */}
                        <Link href="/">
                            <div className="absolute-center mx-auto flex h-44 w-full justify-center px-6">
                                {/* <Logo style="h-44 w-44 z-10 cursor-pointer" /> */}

                                <img src="/images/logo.png" alt="" className='h-44 w-44 z-10 cursor-pointer' />
                            </div>
                        </Link>

                        <div className="flex w-full justify-end font-secondary text-3xl font-medium">
                            <div className="hidden w-full lg:flex">
                                <DesktopNavigation />
                            </div>

                            <div
                                onClick={() => setIsSearch(!isSearch)}
                                className="md:absolute-center  smooth-effect relative z-10 hidden cursor-pointer stroke-white transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6"
                            >
                                <MagnifyingGlassIcon className="inset-y-0 h-16 w-16 border-r border-transparent stroke-white" />

                                <SearchModal />
                            </div>

                            {/* Carts */}

                            <div className="md:absolute-center smooth-effect relative z-10 mr-6 hidden cursor-pointer stroke-white transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6">
                                <ShoppingBagIcon
                                    className="h-16 w-16 bg-transparent stroke-white"
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                />
                                <div className="absolute top-1/2 left-1/2 -z-10 mt-7 h-full -translate-x-1/2 -translate-y-1/2 font-secondary text-2xl text-white">
                                    {cartCtx?.userWithCart?.cart.length}
                                    <ShoppingCart />
                                </div>
                            </div>

                            <div
                                onClick={() => setIsOpen(true)}
                                className="md:absolute-center smooth-effect mr-6 hidden cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6"
                            >
                                {!session ? (
                                    <>
                                        <UserCircleIcon
                                            className="h-[3.75rem] w-[3.75rem] stroke-white"
                                            onClick={() => setIsLogin(!isLogin)}
                                        />
                                        <Login />
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className="absolute-center h-[3.75rem] w-[3.75rem] cursor-pointer rounded-full bg-contain bg-center transition ease-in-out hover:-translate-y-1 hover:scale-110 "
                                            onClick={() => setIsOpen(!isOpen)}
                                            style={{
                                                backgroundImage: `url(${
                                                    session?.user?.image
                                                        ? session?.user?.image
                                                        : ''
                                                })`,
                                            }}
                                        />
                                        <UserMenu />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default memo(Header);
