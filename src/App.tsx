import { useState, useEffect } from 'react';
import { Train } from 'lucide-react';
import SearchForm from './components/SearchForm';
import TrainList from './components/TrainList';
import SeatSelection from './components/SeatSelection';
import Auth from './pages/Auth';
import { Train as TrainType } from './types';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [step, setStep] = useState<'search' | 'trains' | 'seats'>('search');
    const [selectedTrain, setSelectedTrain] = useState<TrainType | null>(null);
    const [searchParams, setSearchParams] = useState({
        from_station_name: '',
        to_station_name: '',
        date: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleSearch = (params: typeof searchParams) => {
        setSearchParams(params);
        setStep('trains');
    };

    const handleTrainSelect = (train: TrainType) => {
        setSelectedTrain(train);
        localStorage.setItem('selectedTrain', JSON.stringify(train));
        setStep('seats');
    };

    const handleBooking = async (selectedSeats: string[]) => {
        alert(`Booked seats: ${selectedSeats.join(', ')}`);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const selectedTrain = JSON.parse(
            localStorage.getItem('selectedTrain') || '{}'
        );
        const user_id = user.user_id;
        const train_id = selectedTrain.train_id;
        const jwt = localStorage.getItem('token');
        const from_station_name = searchParams.from_station_name;
        const to_station_name = searchParams.to_station_name;

        if (
            !user_id ||
            !train_id ||
            !from_station_name ||
            !to_station_name ||
            !jwt
        ) {
            alert('Missing booking information.');
            return;
        }

        const requestBody = {
            from_station_name,
            to_station_name,
            train_id,
            user_id,
            seat_numbers: selectedSeats,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_TICKET_API_URL}/api/ticket/book`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            alert(`Booked seats: ${selectedSeats.join(', ')}`);
            setStep('search');
            setSelectedTrain(null);
            console.log('Booking response:', response.data);
        } catch (error) {
            console.error('Failed to book seats:', error);
            alert('Failed to book seats. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return <Auth onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-indigo-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Train className="w-8 h-8" />
                            <h1 className="text-2xl font-bold">
                                Bangladesh Railways
                            </h1>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                localStorage.removeItem('selectedTrain');
                                setIsAuthenticated(false);
                            }}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {step === 'search' && (
                        <SearchForm onSearch={handleSearch} />
                    )}

                    {step === 'trains' && (
                        <TrainList
                            searchParams={searchParams}
                            onSelect={handleTrainSelect}
                        />
                    )}

                    {step === 'seats' && selectedTrain && (
                        <SeatSelection
                            train={selectedTrain}
                            onBook={handleBooking}
                            onBack={() => setStep('trains')}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
