import React from 'react';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import cn from '~/helpers/cn';

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    title: string;
    register?: UseFormRegisterReturn;
    error?: FieldError;
    textArea?: boolean;
}

const Input = ({
    title,
    register,
    required,
    className,
    error,
    textArea,
    ...props
}: InputProps) => {
    return (
        <div className="mt-2">
            <div className="flex flex-row">
                <div className="mb-5 ml-4 h-6 font-primary text-3xl font-bold ">
                    {title}
                </div>
                {required && <p className="ml-1 text-red-400">*</p>}
            </div>
            {!textArea ? (
                <input
                    className={cn(
                        'h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl',
                        className,
                    )}
                    {...register}
                    {...props}
                />
            ) : (
                <textarea
                    className={cn(
                        'rounded-3xl border border-black p-6 font-primary text-2xl',
                        className,
                    )}
                    rows={4}
                    {...register}
                    {...props}
                />
            )}
            <p className="mt-1 text-right text-sm font-bold text-red-400">
                {error && error.message}
            </p>
        </div>
    );
};

export default Input;
