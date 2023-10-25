import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/libs/server/auth';

export const getSession = async () => {
    return await getServerSession(authOptions);
};
