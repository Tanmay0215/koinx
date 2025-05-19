import React from 'react';

const StatRow = ({ label, shortTerm, longTerm }) => (
    <div className="flex justify-between py-1">
        <p className="text-gray-600">{label}</p>
        <div className="flex w-1/2 justify-between">
            <p className="w-1/2 text-right">{shortTerm}</p>
            <p className="w-1/2 text-right">{longTerm}</p>
        </div>
    </div>
);

const TaxHarvestingInfo = ({ preHarvesting, afterHarvesting, realizedGains, effectiveGains, savings }) => {
    return (
        <div className="font-sans">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-700">Tax Harvesting</h2>
                    <a href="#" className="text-sm text-blue-600 hover:underline">How it works?</a>
                </div>
                <div className="text-sm text-gray-600 bg-blue-100 border border-blue-200 p-3 rounded-md">
                    <p>Important Notes & Disclaimers</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-md font-semibold mb-3 text-gray-700">Pre Harvesting</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <p></p>
                    <div className="flex w-1/2 justify-between">
                        <p className="w-1/2 text-right font-medium">Short-term</p>
                        <p className="w-1/2 text-right font-medium">Long-term</p>
                    </div>
                </div>
                <StatRow label="Profits" shortTerm={preHarvesting.profits.short} longTerm={preHarvesting.profits.long} />
                <StatRow label="Losses" shortTerm={preHarvesting.losses.short} longTerm={preHarvesting.losses.long} />
                <StatRow label="Net Capital Gains" shortTerm={preHarvesting.netGains.short} longTerm={preHarvesting.netGains.long} />
                <hr className="my-3" />
                <div className="flex justify-between font-semibold">
                    <p>Realised Capital Gains:</p>
                    <p>{realizedGains}</p>
                </div>
            </div>

            <div className="bg-blue-600 text-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-md font-semibold mb-3">After Harvesting</h3>
                <div className="flex justify-between text-sm opacity-80 mb-2">
                    <p></p>
                    <div className="flex w-1/2 justify-between">
                        <p className="w-1/2 text-right font-medium">Short-term</p>
                        <p className="w-1/2 text-right font-medium">Long-term</p>
                    </div>
                </div>
                <StatRow label="Profits" shortTerm={afterHarvesting.profits.short} longTerm={afterHarvesting.profits.long} />
                <StatRow label="Losses" shortTerm={afterHarvesting.losses.short} longTerm={afterHarvesting.losses.long} />
                <StatRow label="Net Capital Gains" shortTerm={afterHarvesting.netGains.short} longTerm={afterHarvesting.netGains.long} />
                <hr className="my-3 border-blue-400" />
                <div className="flex justify-between font-semibold">
                    <p>Effective Capital Gains:</p>
                    <p>{effectiveGains}</p>
                </div>
                <div className="mt-4 bg-yellow-400 text-yellow-800 p-3 rounded-md flex items-center justify-center">
                    <span className="mr-2">🎉</span>
                    <p className="font-semibold">You are going to save upto {savings}</p>
                </div>
            </div>
        </div>
    );
};

export default TaxHarvestingInfo;
