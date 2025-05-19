import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HoldingRow = ({ holding, isSelected, onSelect }) => {
    const { theme } = useTheme();

    const formatGainLoss = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return value; // Return original if not a number
        const prefix = num >= 0 ? '+' : '';
        return `${prefix}$${Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const gainLossColor = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
        return num >= 0 ? 'text-green-500' : 'text-red-500';
    };

    // Ensure holding.totalHolding is a number for calculations if needed for "Amount to Sell" formatting
    const totalHoldingDisplay = typeof holding.totalHolding === 'number' ? holding.totalHolding.toFixed(5) : holding.totalHolding;


    return (
        <tr className={`${isSelected ? (theme === 'dark' ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-200 bg-opacity-40') : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}>
            <td className={`p-3 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                    className={`form-checkbox h-5 w-5 ${theme === 'dark' ? 'text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500' : 'text-blue-600 border-gray-300 focus:ring-blue-500'} rounded`}
                />
            </td>
            <td className={`p-3 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                <div className="flex items-center">
                    <img src={holding.icon} alt={holding.name} className="h-8 w-8 mr-3 rounded-full" />
                    <div>
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{holding.name}</p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{holding.symbol}</p>
                    </div>
                </div>
            </td>
            <td className={`p-3 ${theme === 'dark' ? 'border-b border-gray-700 text-white' : 'border-b border-gray-300 text-gray-900'}`}>
                <div>
                    {holding.holdings}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    ${holding.currentPrice ? holding.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}/{holding.symbol}
                </div>
            </td>
            <td className={`p-3 ${theme === 'dark' ? 'border-b border-gray-700 text-white' : 'border-b border-gray-300 text-gray-900'}`}>{holding.value}</td>
            <td className={`p-3 ${gainLossColor(holding.stcg)} ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                {formatGainLoss(holding.stcg)}
                {/* Placeholder for sub-text like '0.338 BTC' if data becomes available */}
            </td>
            <td className={`p-3 ${gainLossColor(holding.ltcg)} ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                {formatGainLoss(holding.ltcg)}
                {/* Placeholder for sub-text like '0.300 BTC' if data becomes available */}
            </td>
            <td className={`p-3 ${theme === 'dark' ? 'border-b border-gray-700 text-white' : 'border-b border-gray-300 text-gray-900'}`}>
                {isSelected ? `${totalHoldingDisplay} ${holding.symbol}` : '-'}
            </td>
        </tr>
    );
};

export default HoldingRow;
