import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Train } from '../types';
import { trainService } from '../services/api';

interface TrainListProps {
    searchParams: {
        from_station_name: string;
        to_station_name: string;
        date: string;
    };
    onSelect: (train: Train) => void;
}

// Keep MOCK_TRAINS as fallback data
const MOCK_TRAINS: Train[] = [
    {
        train_id: '0c355a51-ebb3-4082-a262-703a09273801',
        train_name: 'Suborno Express',
        // number: 'SE701',
        departure_time: '06:00',
        // arrival: '22:30',
        // duration: '16h 30m',
        price: 850,
        // seatsAvailable: 48,
    },
    {
        train_id: '2',
        train_name: 'Mohanagar Express',
        // number: 'ME703',
        departure_time: '08:30',
        // arrival: '14:30',
        // duration: '6h 00m',
        price: 550,
        // seatsAvailable: 32,
    },
    {
        train_id: '3',
        train_name: 'Ekota Express',
        // number: 'EE705',
        departure_time: '23:00',
        // arrival: '13:30',
        // duration: '14h 30m',
        price: 750,
        // seatsAvailable: 24,
    },
    {
        train_id: '4',
        train_name: 'Tista Express',
        // number: 'TE707',
        departure_time: '15:00',
        // arrival: '23:30',
        // duration: '8h 30m',
        price: 650,
        // seatsAvailable: 36,
    },
];

const TrainList: React.FC<TrainListProps> = ({ searchParams, onSelect }) => {
    const [trains, setTrains] = useState<Train[]>(MOCK_TRAINS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrains = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await trainService.searchTrains(searchParams);
                setTrains(data);
            } catch {
                setError('Failed to fetch trains. Showing mock data instead.');
                setTrains(MOCK_TRAINS);
            } finally {
                setLoading(false);
            }
        };

        fetchTrains();
    }, [searchParams]);

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
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {searchParams.from_station_name} →{' '}
                            {searchParams.to_station_name}
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

            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                {trains.map(train => (
                    <div
                        key={train.train_id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {train.train_name}
                                </h3>
                                {/* <p className="text-sm text-gray-600">
                                    Train #{train.number}
                                </p> */}
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-gray-800">
                                        {train.departure_time}
                                    </p>
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <p className="text-sm text-gray-600">
                                        {searchParams.from_station_name}
                                    </p>
                                </div>

                                {/* <div className="flex flex-col items-center">
                                    <p className="text-sm text-gray-600">
                                        {train.duration}
                                    </p>
                                </div> */}

                                <div className="text-center">
                                    {/* <p className="text-lg font-bold text-gray-800">
                                        {train.arrival}
                                    </p> */}
                                    <p className="text-sm text-gray-600">
                                        {searchParams.to_station_name}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-center md:text-right">
                                <p className="text-2xl font-bold text-indigo-600">
                                    ৳{train.price}
                                </p>
                                {/* <div className="flex items-center justify-center md:justify-end space-x-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">
                                        {train.seatsAvailable} seats left
                                    </span>
                                </div> */}
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
