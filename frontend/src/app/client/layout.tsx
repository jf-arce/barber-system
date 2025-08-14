import { MainContainer } from '@/core/containers/MainContainer';
import { ClientNavbar } from '@/core/layouts/ClientNavbar';
import { Footer } from '@/core/layouts/Footer';
import { AuthClientProvider } from '@/modules/auth/providers/AuthClientProvider';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {

    return (
        <AuthClientProvider>
            <ClientNavbar />
            <section className='bg-background'>
                <MainContainer>
                    {children}
                </MainContainer>
            </section>
            <Footer />
        </AuthClientProvider>
    );
}