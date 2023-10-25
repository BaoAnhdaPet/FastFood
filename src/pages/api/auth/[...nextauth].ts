import NextAuth from 'next-auth';
import { authOptions } from '~/libs/server/auth';

export default NextAuth(authOptions);
