import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface SearchFormProps {
    onSearch: (params: {
        from_station_name: string;
        to_station_name: string;
        date: string;
    }) => void;
}

const STATIONS = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Rangpur',
    'Dinajpur',
    'Comilla',
    'Mymensingh',
    'Jessore',
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const from_station_name = (form.from as HTMLSelectElement).value;
        const to_station_name = (form.to as HTMLSelectElement).value;
        const date = (form.date as HTMLInputElement).value;

        if (from_station_name === to_station_name) {
            alert('Please select different stations');
            return;
        }

        onSearch({ from_station_name, to_station_name, date });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Find Your Train
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-indigo-600" />
                                <span>From Station</span>
                            </div>
                        </label>
                        <select
                            name="from"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select departure station</option>
                            {STATIONS.map(station => (
                                <option key={station} value={station}>
                                    {station}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-indigo-600" />
                                <span>To Station</span>
                            </div>
                        </label>
                        <select
                            name="to"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select arrival station</option>
                            {STATIONS.map(station => (
                                <option key={station} value={station}>
                                    {station}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-indigo-600" />
                            <span>Travel Date</span>
                        </div>
                    </label>
                    <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-200 font-medium"
                >
                    Search Trains
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
