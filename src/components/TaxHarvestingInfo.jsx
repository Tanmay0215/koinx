import React, { useState } from 'react'; // Import useState
import { useTheme } from '../context/ThemeContext';
import { InfoIcon, ChevronDownIcon } from 'lucide-react'; // Added ChevronDownIcon

const StatRow = ({ label, shortTerm, longTerm }) => {
    const { theme } = useTheme();
    return (
        <div className="flex justify-between py-1">
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{label}</p>
            <div className="flex w-1/2 justify-between">
                <p className={`w-1/2 text-right ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>{shortTerm}</p>
                <p className={`w-1/2 text-right ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>{longTerm}</p>
            </div>
        </div>
    );
}

const TaxHarvestingInfo = ({ preHarvesting, afterHarvesting, realizedGains, effectiveGains, savings }) => {
    const { theme } = useTheme();
    const [showHowItWorksTooltip, setShowHowItWorksTooltip] = useState(false);
    const [showDisclaimerTooltip, setShowDisclaimerTooltip] = useState(false);

    return (
        <div className="font-sans">
            <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between mb-2"> {/* Changed to justify-between */}
                    <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Tax Harvesting</h2>
                    <div
                        className="relative" // Added relative positioning for tooltip
                        onMouseEnter={() => setShowHowItWorksTooltip(true)}
                        onMouseLeave={() => setShowHowItWorksTooltip(false)}
                    >
                        <a href="#" className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} underline`}>How it works?</a>
                        {showHowItWorksTooltip && (
                            <div
                                className={`absolute z-10 w-64 p-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} rounded-md shadow-lg right-0 mt-2`}
                                style={{ top: '100%' }} // Position below the link
                            >
                                <div className={`absolute w-3 h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} transform rotate-45 -top-1.5 right-3`}></div> {/* Arrow */}
                                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.
                                <a href="#" className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'} hover:underline`}>Know More</a>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`relative flex items-center justify-between text-sm p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-blue-100 text-gray-600 border-blue-200'} border cursor-pointer`}
                    onMouseEnter={() => setShowDisclaimerTooltip(true)}
                    onMouseLeave={() => setShowDisclaimerTooltip(false)}
                >
                    <div className="flex items-center gap-1">
                        <InfoIcon size={18} />
                        <p>Important Notes & Disclaimers</p>
                    </div>
                    <ChevronDownIcon size={18} /> {/* Added ChevronDownIcon */}
                    {showDisclaimerTooltip && (
                        <div
                            className={`absolute z-10 w-full sm:w-80 p-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} rounded-md shadow-lg left-0 mt-2`}
                            style={{ top: '100%' }} // Position below the disclaimer bar
                        >
                            <div className={`absolute w-3 h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} transform rotate-45 -top-1.5 left-6`}></div> {/* Arrow */}
                            This is a disclaimer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit laoreet id donec ultrices.
                            <a href="#" className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'} hover:underline`}>Learn More</a>
                        </div>
                    )}
                </div>
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
                        <p>{realizedGains}</p>
                    </div>
                </div>

                <div className={`w-full text-white shadow rounded-lg p-6 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'}`}>
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
                        <p>{effectiveGains}</p>
                    </div>
                    <div className={`mt-4 p-3 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-yellow-500 text-yellow-900' : 'bg-yellow-400 text-yellow-800'}`}>
                        <span className="mr-2">🎉</span>
                        <p className="font-semibold">You are going to save upto {savings}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxHarvestingInfo;
