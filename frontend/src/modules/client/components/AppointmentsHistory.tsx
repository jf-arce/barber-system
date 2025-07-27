"use client";
import { Button } from "@/components/Button";
import { History, Star } from "lucide-react";

const historyData = [
  {
    service: "Corte y Barba",
    date: "20 Dic 2023",
    time: "14:00",
    price: 3500,
    rating: 5,
  },
  {
    service: "Coloración",
    date: "15 Nov 2023",
    time: "16:30",
    price: 6000,
    rating: 5,
  },
  {
    service: "Afeitado Premium",
    date: "10 Oct 2023",
    time: "13:00",
    price: 4000,
    rating: 4,
  },
];

export const AppointmentsHistory = () => {
    return (
        <div className="bg-gray-100 shadow-xl mt-6 rounded-sm animate-fade-up animate-duration-700 animate-ease-out animate-delay-300">
            <div className="p-4">
                <h4 className="text-sm font-medium text-black mb-3 flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    Historial Reciente
                </h4>
                <div className="space-y-3">
                    {historyData.slice(0, 2).map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                        >
                            <div>
                                <p className="text-black font-semibold">
                                    {item.service}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                    <span>{item.date}</span>
                                    <span>·</span>
                                    <span>{item.time}</span>
                                    <span>·</span>
                                    <span className="text-black/80 font-bold">
                                        ${item.price}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-3 w-3 fill-yellow-500 text-yellow-500"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="mt-3 !text-black/80">
                    Ver todo el historial
                </Button>
            </div>
        </div>
    );
};
