import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen text-background">
      <div className="hidden sm:block flex-1 relative">
        <Image
          src="/images/auth-wallpaper.webp"
          alt="Imagen de fondo"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex-1 p-6 flex items-center justify-center relative">
        <Link 
          href="/"
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al inicio</span>
        </Link>

        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
