import React from 'react';
import HoldingCard from './HoldingCard';
import { useTheme } from '../context/ThemeContext';

const Holdings = ({ holdings }) => {
    const { theme } = useTheme();
    return (
        <div className={`shadow rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Holdings</h2>
            <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center">
                    <input type="checkbox" className="mr-4" />
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Asset</p>
                </div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Holdings</p>
            </div>
            {holdings.map((holding, index) => (
                <HoldingCard key={index} asset={holding} />
            ))}
        </div>
    );
};

export default Holdings;
