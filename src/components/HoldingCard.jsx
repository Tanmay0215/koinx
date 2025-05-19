import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HoldingCard = ({ asset }) => {
    const { theme } = useTheme();
    return (
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
                <input type="checkbox" className="mr-4" checked={asset.checked} readOnly />
                <img src={asset.icon} alt={asset.name} className="w-8 h-8 mr-4" />
                <div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{asset.name}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{asset.symbol}</p>
                </div>
            </div>
            <div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{asset.holdings}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{asset.value}</p>
            </div>
        </div>
    );
};

export default HoldingCard;
