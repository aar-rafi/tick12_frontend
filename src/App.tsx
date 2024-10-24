import { useState } from 'react';
import { Train } from 'lucide-react';
import SearchForm from './components/SearchForm';
import TrainList from './components/TrainList';
import SeatSelection from './components/SeatSelection';
import { Train as TrainType } from './types';

function App() {
    const [step, setStep] = useState<'search' | 'trains' | 'seats'>('search');
    const [selectedTrain, setSelectedTrain] = useState<TrainType | null>(null);
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: '',
    });

    const handleSearch = (params: typeof searchParams) => {
        setSearchParams(params);
        setStep('trains');
    };

    const handleTrainSelect = (train: TrainType) => {
        setSelectedTrain(train);
        setStep('seats');
    };

    const handleBooking = (selectedSeats: string[]) => {
        alert(`Booked seats: ${selectedSeats.join(', ')}`);
        setStep('search');
        setSelectedTrain(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-indigo-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2">
                        <Train className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">
                            Bangladesh Railways
                        </h1>
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
