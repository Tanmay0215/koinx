import React, { useEffect, useState, useCallback } from 'react';
import HoldingsTable from './components/Holdings';
import TaxHarvestingInfo from './components/TaxHarvestingInfo';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
  const { theme } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null); // Initialize with null
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchCapitalGains = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/capital-gains`);
      const { stcg, ltcg } = response.data.capitalGains;
      setCapitalGains({
        shortTerm: {
          profits: stcg.profits,
          losses: stcg.losses,
          netGains: stcg.profits - stcg.losses,
        },
        longTerm: {
          profits: ltcg.profits,
          losses: ltcg.losses,
          netGains: ltcg.profits - ltcg.losses,
        },
      });
    } catch (error) {
      setError(error);
      console.error("Error fetching capital gains:", error);
    } finally {
      setIsLoading(false);
    }
  }, [BACKEND_URL]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/holdings`);
      const formattedHoldings = response.data.map((item, index) => {
        const numericValue = parseFloat(item.totalHolding) * parseFloat(item.currentPrice);
        return {
          id: item.id || `holding-${index}`,
          name: item.coinName,
          symbol: item.coin,
          holdings: `${parseFloat(item.totalHolding).toFixed(5)} ${item.coin}`,
          value: `$${numericValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          numericValue: numericValue,
          icon: item.logo,
          averageBuyPrice: parseFloat(item.averageBuyPrice),
          currentPrice: parseFloat(item.currentPrice),
          ltcg: parseFloat(item.ltcgAmount) || 0,
          stcg: parseFloat(item.stcgAmount) || 0,
          totalHolding: parseFloat(item.totalHolding)
        };
      });
      setHoldings(formattedHoldings);
    } catch (error) {
      setError(error);
      console.error("Error fetching holdings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    fetchData();
    fetchCapitalGains();
  }, [fetchData, fetchCapitalGains]);

  const preHarvestingData = capitalGains ? {
    profits: {
      short: capitalGains.shortTerm.profits, // Pass raw numbers
      long: capitalGains.longTerm.profits
    },
    losses: {
      short: capitalGains.shortTerm.losses,
      long: capitalGains.longTerm.losses
    },
    netGains: {
      short: capitalGains.shortTerm.netGains,
      long: capitalGains.longTerm.netGains
    },
  } : {
    profits: { short: 0, long: 0 }, // Pass raw numbers
    losses: { short: 0, long: 0 },
    netGains: { short: 0, long: 0 },
  };

  const afterHarvestingData = {
    profits: { short: 1540, long: 1200 }, // Pass raw numbers
    losses: { short: -2343, long: -3650 },
    netGains: { short: -987, long: -2450 },
  };
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <div className="p-4 md:p-8 space-y-5">
        {isLoading ? (
          <p className={`text-center text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Loading data...</p>
        ) : (
          <>
            <TaxHarvestingInfo
              preHarvesting={preHarvestingData}
              afterHarvesting={afterHarvestingData}
            />
            <HoldingsTable holdings={holdings} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
