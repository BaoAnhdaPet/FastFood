import { Menu } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MobileSearch = () => {
    return (
        <Menu>
            <Menu.Button>
                <MagnifyingGlassIcon className="smooth-effect relative h-12 w-12 transition ease-in-out hover:-translate-y-1 hover:scale-110" />
            </Menu.Button>
            <Menu.Items className="absolute top-16 left-0 my-7 flex h-fit w-full border-2 font-primary text-3xl font-semibold shadow-xl">
                <input
                    autoFocus
                    type="text"
                    className="h-20 w-full bg-[#F3F2EC] pl-6 text-2xl focus:outline-none"
                    placeholder="Bạn tìm gì thế ? 	(.❛ ᴗ ❛.)"
                />
            </Menu.Items>
        </Menu>
    );
};

export default MobileSearch;
