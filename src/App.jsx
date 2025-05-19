import React, { useEffect, useState } from 'react';
import Holdings from './components/Holdings';
import TaxHarvestingInfo from './components/TaxHarvestingInfo';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import axios from 'axios';

// Placeholder data based on the image
const preHarvestingData = {
  profits: { short: '$1,540', long: '$1,200' },
  losses: { short: '-$743', long: '-$650' },
  netGains: { short: '$787', long: '$550' },
};

const afterHarvestingData = {
  profits: { short: '$1,540', long: '$1,200' },
  losses: { short: '-$2,343', long: '-$3,650' },
  netGains: { short: '-$987', long: '-$2,450' },
};

const App = () => {
  const { theme } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/holdings`);
      const formattedHoldings = response.data.map(item => ({
        name: item.coinName, // Use coinName for name
        symbol: item.coin,    // Use coin for symbol
        holdings: `${item.totalHolding} ${item.coin}`, // Format holdings string
        value: `$${(item.totalHolding * item.currentPrice).toFixed(2)}`, // Calculate total value
        icon: item.logo,      // Use logo for icon
        checked: false,       // Default checked state, adjust as needed
        averageBuyPrice: item.averageBuyPrice,
        currentPrice: item.currentPrice,
        ltcg: item.ltcg,
        stcg: item.stcg,
      }));
      setHoldings(formattedHoldings);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching (success or error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <div className="p-4 md:p-8">
        {isLoading ? (
          <p className={`text-center text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Loading holdings data...</p>
        ) : (
          <>
            <TaxHarvestingInfo
              preHarvesting={preHarvestingData}
              afterHarvesting={afterHarvestingData}
              realizedGains="$1,337"
              effectiveGains="-$2,353"
              savings="$862"
            />
            <Holdings holdings={holdings} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
