import Forecast from './components/Forecast';
import backgroundImg from './assets/background-image.png';
import useForecast from './hooks/useForecast';
import { Toaster } from 'react-hot-toast'; // Import Toaster from react-hot-toast
import DropdownSelect from './components/DropdownSelect';
import { options } from './constants';
const App = (): JSX.Element => {
  const { forecast, fetchCityData } = useForecast();

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} /> 
    <main
    className="flex justify-center items-center bg-cover bg-center min-h-screen select-none"
    style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <DropdownSelect options={options} fetchCityData={fetchCityData} />
      )}
    </main>
    </div>
  );
};

export default App;
