import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { InfoIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

// Helper function to format currency
const formatCurrency = (value) => {
    if (typeof value !== 'number') return '$0.00';
    return `${value < 0 ? '-' : ''}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const StatRow = ({ label, shortTerm, longTerm }) => {
    const { theme } = useTheme();
    return (
        <div className="flex justify-between py-1">
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{label}</p>
            <div className="flex w-1/2 justify-between">
                <p className={`w-1/2 text-right ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>{formatCurrency(shortTerm)}</p>
                <p className={`w-1/2 text-right ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>{formatCurrency(longTerm)}</p>
            </div>
        </div>
    );
}

const TaxHarvestingInfo = ({ preHarvesting, afterHarvesting }) => {
    const { theme } = useTheme();
    const [showHowItWorksTooltip, setShowHowItWorksTooltip] = useState(false);
    const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);

    // Calculate realizedGains using raw numbers and then format
    const rawRealizedGains = (preHarvesting.netGains.short || 0) + (preHarvesting.netGains.long || 0);
    const formattedRealizedGains = formatCurrency(rawRealizedGains);

    // Calculate Effective Capital Gains
    const effectiveGains = (afterHarvesting.netGains.short || 0) + (afterHarvesting.netGains.long || 0);
    const formattedEffectiveGains = formatCurrency(effectiveGains);

    // Calculate Savings
    // Savings = (Net Capital Gains Before Harvesting) - (Net Capital Gains After Harvesting)
    // Note: Tax rate is assumed to be 0 for simplicity here, otherwise it would be: (Net Before - Net After) * TaxRate
    const netBeforeHarvesting = rawRealizedGains;
    const netAfterHarvesting = effectiveGains;
    const savings = netBeforeHarvesting - netAfterHarvesting;
    const formattedSavings = formatCurrency(savings);

    return (
        <div className="font-sans">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Tax Harvesting</h2>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowHowItWorksTooltip(true)}
                        onMouseLeave={() => setShowHowItWorksTooltip(false)}
                    >
                        <p className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} underline`}>How it works?</p>
                        {showHowItWorksTooltip && (
                            <div
                                className={`absolute z-10 w-64 p-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} rounded-md shadow-lg right-0 mt-2`}
                            >
                                <div className={`absolute w-3 h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} transform rotate-45 -top-1.5 right-3`}></div>
                                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.
                                <a href="#" className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'} hover:underline`}>Know More</a>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`flex items-center justify-between text-sm p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-blue-100 text-gray-600 border-blue-200'} border cursor-pointer mb-2`}
                    onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                >
                    <div className="flex items-center gap-1">
                        <InfoIcon size={18} />
                        <p>Important Notes & Disclaimers</p>
                    </div>
                    {isDisclaimerExpanded ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
                </div>
                {isDisclaimerExpanded && (
                    <div className={`p-4 rounded-b-lg text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-gray-700'}`}>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
                            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
                            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
                            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
                            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='flex flex-col md:flex-row md:space-x-4'>
                <div className={`w-full shadow rounded-lg p-6 mb-6 md:mb-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className={`text-md font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Pre Harvesting</h3>
                    <div className={`flex justify-between text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <p></p>
                        <div className="flex w-1/2 justify-between">
                            <p className="w-1/2 text-right font-medium">Short-term</p>
                            <p className="w-1/2 text-right font-medium">Long-term</p>
                        </div>
                    </div>
                    <StatRow label="Profits" shortTerm={preHarvesting.profits.short} longTerm={preHarvesting.profits.long} />
                    <StatRow label="Losses" shortTerm={preHarvesting.losses.short} longTerm={preHarvesting.losses.long} />
                    <StatRow label="Net Capital Gains" shortTerm={preHarvesting.netGains.short} longTerm={preHarvesting.netGains.long} />
                    <hr className={`my-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                    <div className={`flex justify-between font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        <p>Realised Capital Gains:</p>
                        <p>{formattedRealizedGains}</p>
                    </div>
                </div>

                <div className={`w-full text-white shadow rounded-lg p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-700 to-blue-900' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
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
                    <hr className={`my-3 ${theme === 'dark' ? 'border-blue-500' : 'border-blue-400'}`} />
                    <div className="flex justify-between font-semibold">
                        <p>Effective Capital Gains:</p>
                        <p>{formattedEffectiveGains}</p>
                    </div>
                    <div className={`mt-4 p-3 rounded-md flex items-center justify-center`}>
                        <span className="mr-2">🎉</span>
                        <p className="font-semibold">You are going to save upto {formattedSavings}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxHarvestingInfo;
