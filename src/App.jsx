import React from 'react';
import Holdings from './components/Holdings';
import TaxHarvestingInfo from './components/TaxHarvestingInfo';
import './index.css'; // Ensure Tailwind styles are imported

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

const holdingsData = [
  { name: 'Bitcoin', symbol: 'BTC', holdings: '0.63776 BTC', value: '$55,320.15', icon: 'https://via.placeholder.com/32/FFA500/000000?Text=B', checked: true },
  { name: 'Ethereum', symbol: 'ETH', holdings: '5.6736 ETH', value: '$55,320.15', icon: 'https://via.placeholder.com/32/808080/FFFFFF?Text=E', checked: false },
  { name: 'Tether', symbol: 'USDT', holdings: '3096.542 USDT', value: '$55,320.15', icon: 'https://via.placeholder.com/32/26A17B/FFFFFF?Text=T', checked: false },
  { name: 'Polygon', symbol: 'MATIC', holdings: '2210 MATIC', value: '$55,320.15', icon: 'https://via.placeholder.com/32/8247E5/FFFFFF?Text=P', checked: false },
  { name: 'Ethereum', symbol: 'ETH', holdings: '5.6736 ETH', value: '$55,320.15', icon: 'https://via.placeholder.com/32/808080/FFFFFF?Text=E', checked: false },
  { name: 'Tether', symbol: 'USDT', holdings: '3096.542 USDT', value: '$55,320.15', icon: 'https://via.placeholder.com/32/26A17B/FFFFFF?Text=T', checked: false },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <TaxHarvestingInfo
          preHarvesting={preHarvestingData}
          afterHarvesting={afterHarvestingData}
          realizedGains="$1,337"
          effectiveGains="-$2,353"
          savings="$862"
        />
        <Holdings holdings={holdingsData} />
      </div>
    </div>
  );
};

export default App;
