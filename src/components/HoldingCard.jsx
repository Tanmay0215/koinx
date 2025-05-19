import React from 'react';

const HoldingCard = ({ asset }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <input type="checkbox" className="mr-4" checked={asset.checked} readOnly />
                <img src={asset.icon} alt={asset.name} className="w-8 h-8 mr-4" />
                <div>
                    <p className="font-semibold">{asset.name}</p>
                    <p className="text-sm text-gray-500">{asset.symbol}</p>
                </div>
            </div>
            <div>
                <p className="font-semibold">{asset.holdings}</p>
                <p className="text-sm text-gray-500">{asset.value}</p>
            </div>
        </div>
    );
};

export default HoldingCard;
