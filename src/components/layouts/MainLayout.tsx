import { ReactNode } from 'react';
import Header from '~/components/partials/Header';
import Footer from '~/components/partials/Footer';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <Toaster toastOptions={{ duration: 3500 }} />
            <main className="min-h-screen overflow-y-hidden">{children}</main>
            <Footer />
        </>
    );
}
