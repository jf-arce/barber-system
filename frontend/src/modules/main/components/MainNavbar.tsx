"use client";
import { LinkButton } from '@/components/LinkButton';
import { COLORS } from '@/constants/colors';
import { useAuthStore } from '@/modules/auth/auth.store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MainNavbar = () => {

  const [navbar, setNavbar] = useState(false);
  const userAuthenticated = useAuthStore((state) => state.userAuthenticated);
  const logout  = useAuthStore((state) => state.logout);
  const router = useRouter();

  const scrollNavBar = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollNavBar);
    return () => {
      window.removeEventListener('scroll', scrollNavBar);
    };
  }, []);

  const handleLogout = async () => {
    logout();
    router.push('/');
  }

  return (
    <nav className={`p-4 ${navbar ? 'bg-background shadow-md' : 'bg-transparent'} transition-all duration-300`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className='flex flex-grow basis-0'>
          <p className="text-white text-lg font-bold">BarberShop</p>
        </div>

        {/* Menu */}
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-white font-semibold hover:text-primary transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white font-semibold hover:text-primary transition-colors">
              Citas
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white font-semibold hover:text-primary transition-colors">
              Sobre Nosotros
            </Link>
          </li>
          {
            userAuthenticated &&      
            <li>
              <Link href="/client/dashboard" className="text-white font-semibold hover:text-primary transition-colors">
                Mi cuenta
              </Link>
            </li>
          }
        </ul>
        {/* Auth Links */}
        {
          userAuthenticated ? (
            <div className="flex flex-grow basis-0 justify-end space-x-4 items-center">
              <span className="text-white font-semibold uppercase">Hola {userAuthenticated.name}!</span>
                <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-sm bg-primary text-black font-medium cursor-pointer hover:bg-primary/80 transition-colors"
                style={{ backgroundColor: COLORS.primary }}
                >
                Cerrar Sesión
                </button>
            </div>
          ) : (
            <div className="flex flex-grow basis-0 justify-end space-x-4">
              <LinkButton
                href="/auth/login"
                variant='tertiary'
              >
                  Iniciar Sesión
              </LinkButton>
              
              <LinkButton
                href="/auth/register"
                className='!text-black'
              >
                  Registrarse
              </LinkButton>
            </div>
          )
        }
      </div>
    </nav>
  );
};
