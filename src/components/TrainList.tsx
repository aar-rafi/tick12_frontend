import React from 'react';
import { Clock, Users } from 'lucide-react';
import { Train } from '../types';

interface TrainListProps {
    searchParams: {
        from: string;
        to: string;
        date: string;
    };
    onSelect: (train: Train) => void;
}

const MOCK_TRAINS: Train[] = [
    {
        id: '1',
        name: 'Suborno Express',
        number: 'SE701',
        departure: '06:00',
        arrival: '22:30',
        duration: '16h 30m',
        price: 850,
        seatsAvailable: 48,
    },
    {
        id: '2',
        name: 'Mohanagar Express',
        number: 'ME703',
        departure: '08:30',
        arrival: '14:30',
        duration: '6h 00m',
        price: 550,
        seatsAvailable: 32,
    },
    {
        id: '3',
        name: 'Ekota Express',
        number: 'EE705',
        departure: '23:00',
        arrival: '13:30',
        duration: '14h 30m',
        price: 750,
        seatsAvailable: 24,
    },
    {
        id: '4',
        name: 'Tista Express',
        number: 'TE707',
        departure: '15:00',
        arrival: '23:30',
        duration: '8h 30m',
        price: 650,
        seatsAvailable: 36,
    },
];

const TrainList: React.FC<TrainListProps> = ({ searchParams, onSelect }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {searchParams.from} → {searchParams.to}
                        </h2>
                        <p className="text-gray-600">
                            {new Date(searchParams.date).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {MOCK_TRAINS.map(train => (
                    <div
                        key={train.id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {train.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Train #{train.number}
                                </p>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-gray-800">
                                        {train.departure}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {searchParams.from}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <p className="text-sm text-gray-600">
                                        {train.duration}
                                    </p>
                                </div>

                                <div className="text-center">
                                    <p className="text-lg font-bold text-gray-800">
                                        {train.arrival}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {searchParams.to}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-center md:text-right">
                                <p className="text-2xl font-bold text-indigo-600">
                                    ৳{train.price}
                                </p>
                                <div className="flex items-center justify-center md:justify-end space-x-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">
                                        {train.seatsAvailable} seats left
                                    </span>
                                </div>
                                <button
                                    onClick={() => onSelect(train)}
                                    className="w-full md:w-auto bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
                                >
                                    Select Seats
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainList;
