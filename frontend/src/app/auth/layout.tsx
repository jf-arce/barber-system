import { ReactNode } from 'react';
import Image from 'next/image';

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

      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </main>
  );
}
