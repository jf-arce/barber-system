"use client";
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export const LocationSection = () => {
    return (
        <section className="py-8">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="relative h-96 lg:h-full min-h-[400px]">
                        <div className="w-full h-full bg-gray-800 border-2 border-primary rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9969455150785!2d-58.38414892347168!3d-34.60373637295273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacba98fa2e5%3A0x59ca0e61d84ed6ad!2sAv.%20Corrientes%201234%2C%20C1043%20CABA!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white mb-10">
                            Visitanos
                        </h2>
                        <div className="bg-transparent border-2 border-primary rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <MapPin className="w-6 h-6 text-primary mr-3" />
                                <h3 className="text-xl font-semibold text-white">Ubicación</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Av. Corrientes 1234, CABA<br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="bg-transparent border-2 border-primary rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Clock className="w-6 h-6 text-primary mr-3" />
                                <h3 className="text-xl font-semibold text-white">Horarios</h3>
                            </div>
                            <div className="text-gray-300 space-y-1">
                                <p>Lunes a Viernes: 9:00 - 20:00</p>
                                <p>Sábados: 9:00 - 18:00</p>
                                <p>Domingos: Cerrado</p>
                            </div>
                        </div>

                        <div className="bg-transparent border-2 border-primary rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Phone className="w-6 h-6 text-primary mr-3" />
                                <h3 className="text-xl font-semibold text-white">Contacto</h3>
                            </div>
                            <div className="text-gray-300 space-y-1">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 text-primary mr-2" />
                                    <p>+54 11 1234-5678</p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-primary mr-2" />
                                    <p>info@barbershop.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};