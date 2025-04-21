"use client";

import { COLORS } from '@/constants/colors';
import Link from 'next/link';
import { Button } from 'quick-ui-components';
import { useEffect, useState } from 'react';

export const MainNavbar = () => {

  const [navbar, setNavbar] = useState(false);

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
              Home
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
          <li>
            <Link href="/contact" className="text-white font-semibold hover:text-primary transition-colors">
              Mi cuenta
            </Link>
          </li>
        </ul>

        {/* Auth Links */}
        <div className="flex flex-grow basis-0 justify-end space-x-4">
          <Button
            asChild
            radius='sm'
            colorBg={COLORS.primary}
            variant='tertiary'

          >
            <Link href="/auth/login">
              Iniciar Sesión
            </Link>
          </Button>
          <Button
            asChild
            radius='sm'
            colorBg={COLORS.primary}
            colorText='black'
            variant='primary'
          >
            <Link href="/auth/register">
              Registrarse
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
