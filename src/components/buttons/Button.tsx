/* eslint-disable indent */

import React, { useState } from 'react';
import cn from '~/helpers/cn';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isLoading?: boolean;
    localLoaderOnClick?: boolean; // default to true

    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'red';
}

const Button = ({
    onClick,
    className = '',
    isLoading = false,
    localLoaderOnClick = true,
    disabled = false,
    children,
    color,
    ...props
}: ButtonProps) => {
    const [localLoading, setLocalLoading] = useState(false);

    const loadStatus = isLoading || (localLoaderOnClick && localLoading);

    const baseClassName =
        'rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px]';
    const primaryClassName = cn(
        baseClassName,
        'smooth-effect absolute-center h-[50px] mx-auto w-[200px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200',
        loadStatus || (disabled && 'bg-zinc-900 cursor-not-allowed'),
    );
    const secondaryClassName = cn(
        baseClassName,
        'border border-zinc-300 hover:bg-zinc-200 text-zinc-600',
        loadStatus || (disabled && 'bg-zinc-200 cursor-not-allowed'),
    );
    const redClassName = cn(
        baseClassName,
        'bg-red-800 hover:bg-red-900 text-gray-100',
        loadStatus || (disabled && 'bg-red-900 cursor-not-allowed'),
    );

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        if (disabled || loadStatus) return;
        setLocalLoading(true);
        if (onClick) {
            return onClick(e);
        }
    };

    return (
        <button
            className={cn(
                disabled && 'cursor-not-allowed',
                color === 'primary'
                    ? primaryClassName
                    : color === 'secondary'
                    ? secondaryClassName
                    : color === 'red' && redClassName,
                className,
            )}
            onClick={handleClick}
            {...props}
        ></button>
    );
};

export default Button;
