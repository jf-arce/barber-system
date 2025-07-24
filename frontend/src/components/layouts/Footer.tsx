import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-background border-t border-primary/20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo y descripción */}
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-4">BarberLP</h3>
                        <p className="text-gray-400 mb-6">
                            Tu barbería de confianza. Estilo, calidad y atención personalizada en cada corte.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-primary transition-colors">
                                    Servicios
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="text-gray-400 hover:text-primary transition-colors">
                                    Reservar Cita
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Servicios</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400">Corte de Cabello</li>
                            <li className="text-gray-400">Arreglo de Barba</li>
                            <li className="text-gray-400">Coloración</li>
                            <li className="text-gray-400">Tratamientos</li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-400">
                                <MapPin className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                <span className="text-sm">Av. Corrientes 1234, CABA</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                <span className="text-sm">+54 11 1234-5678</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Mail className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                <span className="text-sm">info@barbershop.com</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Clock className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                <span className="text-sm">Lun-Vie: 9:00-20:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-primary/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © 2025 BarberShop. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-500 hover:text-primary transition-colors">
                                Política de Privacidad
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-primary transition-colors">
                                Términos de Uso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};