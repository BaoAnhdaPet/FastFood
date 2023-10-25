import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;
