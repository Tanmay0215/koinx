import React from 'react';
import HoldingCard from './HoldingCard';

const Holdings = ({ holdings }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Holdings</h2>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                    <input type="checkbox" className="mr-4" />
                    <p className="font-semibold">Asset</p>
                </div>
                <p className="font-semibold">Holdings</p>
            </div>
            {holdings.map((holding, index) => (
                <HoldingCard key={index} asset={holding} />
            ))}
        </div>
    );
};

export default Holdings;
