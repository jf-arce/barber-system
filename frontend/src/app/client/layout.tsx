import { MainContainer } from '@/components/containers/MainContainer';
import { ClientNavbar } from '@/components/layouts/ClientNavbar';
import { Footer } from '@/components/layouts/Footer';
import { AuthClientProvider } from '@/modules/client/providers/AuthClientProvider';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {

    return (
        <AuthClientProvider>
            <ClientNavbar />
            <section className='bg-foreground'>
                <MainContainer>
                    {children}
                </MainContainer>
            </section>
            <Footer />
        </AuthClientProvider>
    );
}