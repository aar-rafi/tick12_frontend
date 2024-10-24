import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Train } from '../types';
import axios from 'axios';

interface SeatSelectionProps {
    train: Train;
    onBook: (selectedSeats: string[]) => void;
    onBack: () => void;
}

interface BookedSeatsResponse {
    bookedSeats: string[];
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
    train,
    onBook,
    onBack,
}) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookedSeats, setBookedSeats] = useState<string[]>([]);

    useEffect(() => {
        const fetchBookedSeats = async () => {
            setLoading(true);
            setError(null);
            try {
                const date = new Date().toISOString().split('T')[0];
                const time = new Date()
                    .toTimeString()
                    .split(' ')[0]
                    .slice(0, 5);

                const response = await axios.get<BookedSeatsResponse>(
                    `http://localhost:3000/booked-seats?train_id=${train.id}&date=${date}&time=${time}`
                );
                setBookedSeats(response.data.bookedSeats);
            } catch {
                setError('Failed to fetch booked seats. Using mock data.');
                setBookedSeats(['A1', 'B5', 'C10']);
            } finally {
                setLoading(false);
            }
        };

        fetchBookedSeats();
    }, [train.id]);

    const renderCompartment = (name: string) => {
        const seats = [];
        for (let i = 1; i <= 40; i++) {
            const seatId = `${name}${i}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            seats.push(
                <button
                    key={seatId}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seatId)}
                    className={`
                        p-2 rounded-md text-sm font-medium transition duration-200
                        ${
                            isBooked
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-500'
                        }
                    `}
                >
                    {i}
                </button>
            );
        }
        return seats;
    };

    const toggleSeat = (seatId: string) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : [...prev, seatId]
        );
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

            <div className="space-y-6">
                {['A', 'B', 'C'].map(compartment => (
                    <div
                        key={compartment}
                        className="bg-white rounded-lg shadow-lg p-6"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Compartment {compartment}
                        </h3>
                        <div className="grid grid-cols-8 gap-2">
                            {renderCompartment(compartment)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <p className="text-gray-600">
                            Selected seats: {selectedSeats.join(', ')}
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">
                            Total: ৳
                            {(
                                selectedSeats.length * train.price
                            ).toLocaleString()}
                        </p>
                    </div>
                    <button
                        onClick={() => onBook(selectedSeats)}
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
