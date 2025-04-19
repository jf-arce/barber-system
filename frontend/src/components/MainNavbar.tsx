"use client";

import { COLORS } from '@/constants/colors';
import Link from 'next/link';
import { Button } from 'quick-ui-components';

export const MainNavbar = () => {
  return (
    <div>
      <nav className="bg-background p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-lg font-bold">BarberShop</div>

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
          <div className="flex space-x-4">
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
    </div>
  );
};
