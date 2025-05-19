import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback
import HoldingsTable from './components/Holdings'; // New import for the table component
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
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Wrap fetchData in useCallback
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/holdings`);
      const formattedHoldings = response.data.map((item, index) => ({
        id: item.id || `holding-${index}`, // Add a unique id for key prop
        name: item.coinName,
        symbol: item.coin,
        holdings: `${parseFloat(item.totalHolding).toFixed(5)} ${item.coin}`,
        value: `$${(parseFloat(item.totalHolding) * parseFloat(item.currentPrice)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        icon: item.logo,
        checked: item.coin === 'ETH', // Example: Select ETH by default as in image
        averageBuyPrice: parseFloat(item.averageBuyPrice),
        currentPrice: parseFloat(item.currentPrice),
        ltcg: parseFloat(item.ltcgAmount) || 0, // Use ltcgAmount and ensure it's a number
        stcg: parseFloat(item.stcgAmount) || 0, // Use stcgAmount and ensure it's a number
        totalHolding: parseFloat(item.totalHolding) // Ensure totalHolding is a number for HoldingRow
      }));
      setHoldings(formattedHoldings);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [BACKEND_URL]); // Add BACKEND_URL to dependency array

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData to dependency array

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
              realizedGains="$1,337" // This seems to be static based on previous context
              effectiveGains="-$2,353" // This seems to be static
              savings="$862" // This seems to be static
            />
            {/* Replace old Holdings component with HoldingsTable */}
            <HoldingsTable holdings={holdings} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
