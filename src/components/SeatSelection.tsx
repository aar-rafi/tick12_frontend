import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Train } from '../types';
import { trainService } from '../services/api';

interface SeatSelectionProps {
    train: Train;
    onBook: (selectedSeats: string[]) => void;
    onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
    train,
    onBook,
    onBack,
}) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [compartments, setCompartments] = useState<
        Array<{
            name: string;
            seats: Array<{ number: string; booked: boolean }>;
        }>
    >([]);

    useEffect(() => {
        const fetchSeats = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await trainService.getAvailableSeats(
                    train.id,
                    new Date().toISOString()
                );
                // Transform API data to compartments format
                // This is just an example, adjust according to your API response
                const compartmentsData = [
                    { name: 'A', seats: data.slice(0, 18) },
                    { name: 'B', seats: data.slice(18, 36) },
                    { name: 'C', seats: data.slice(36, 54) },
                ];
                setCompartments(compartmentsData);
            } catch {
                setError('Failed to fetch seats. Using mock data.');
                // Fallback to generating mock compartments
                setCompartments([
                    { name: 'A', seats: generateCompartment(0) },
                    { name: 'B', seats: generateCompartment(18) },
                    { name: 'C', seats: generateCompartment(36) },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchSeats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [train.id]);

    const generateCompartment = (start: number) => {
        const seats = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 6; col++) {
                const seatNumber = start + row * 6 + col + 1;
                if (seatNumber <= train.seatsAvailable) {
                    seats.push({
                        number: `${seatNumber}`,
                        booked: Math.random() > 0.7,
                    });
                }
            }
        }
        return seats;
    };

    const toggleSeat = (compartment: string, seatNumber: string) => {
        const seatId = `${compartment}${seatNumber}`;
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : [...prev, seatId]
        );
    };

    const handleBooking = async () => {
        try {
            await trainService.bookSeats(
                train.id,
                selectedSeats,
                new Date().toISOString()
            );
            onBook(selectedSeats);
        } catch {
            setError('Failed to book seats. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <button
                    onClick={onBack}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to train list</span>
                </button>

                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-800">
                        {train.name}
                    </h2>
                    <p className="text-gray-600">Select your preferred seats</p>
                </div>
            </div>

            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compartments.map(compartment => (
                    <div
                        key={compartment.name}
                        className="bg-white rounded-lg shadow-lg p-6"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Compartment {compartment.name}
                        </h3>
                        <div className="grid grid-cols-6 gap-2">
                            {compartment.seats.map(seat => (
                                <button
                                    key={`${compartment.name}${seat.number}`}
                                    disabled={seat.booked}
                                    onClick={() =>
                                        toggleSeat(
                                            compartment.name,
                                            seat.number
                                        )
                                    }
                                    className={`
                    p-2 rounded-md text-sm font-medium transition duration-200
                    ${
                        seat.booked
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedSeats.includes(
                                  `${compartment.name}${seat.number}`
                              )
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-500'
                    }
                  `}
                                >
                                    {seat.number}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <p className="text-gray-600">
                            Selected seats: {selectedSeats.length}
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">
                            Total: ৳
                            {(
                                selectedSeats.length * train.price
                            ).toLocaleString()}
                        </p>
                    </div>
                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Book Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
