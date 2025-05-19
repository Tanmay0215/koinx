import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import HoldingRow from './HoldingRow';

const HoldingsTable = ({ holdings: initialHoldings }) => {
    const { theme } = useTheme();
    const [holdings, setHoldings] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showAllHoldings, setShowAllHoldings] = useState(false);
    const initialDisplayCount = 5;

    useEffect(() => {
        const mappedHoldings = initialHoldings.map(h => ({ ...h, isSelected: h.checked || false }));
        setHoldings(mappedHoldings);
        const allSelected = mappedHoldings.length > 0 && mappedHoldings.every(h => h.isSelected);
        setSelectAll(allSelected);
    }, [initialHoldings]);

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setHoldings(currentHoldings => currentHoldings.map(holding => ({ ...holding, isSelected: isChecked })));
    };

    const handleSelectRow = (id) => {
        setHoldings(currentHoldings => {
            const newHoldings = currentHoldings.map(holding =>
                holding.id === id ? { ...holding, isSelected: !holding.isSelected } : holding
            );
            setSelectAll(newHoldings.length > 0 && newHoldings.every(holding => holding.isSelected));
            return newHoldings;
        });
    };

    const toggleShowAllHoldings = () => {
        setShowAllHoldings(!showAllHoldings);
    };

    const displayedHoldings = showAllHoldings ? holdings : holdings.slice(0, initialDisplayCount);

    return (
        <div className={`shadow rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Holdings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <tr>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider w-12`}>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    disabled={displayedHoldings.length === 0} // Disable if no holdings displayed
                                    className={`form-checkbox h-5 w-5 ${theme === 'dark' ? 'text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500' : 'text-blue-600 border-gray-300 focus:ring-blue-500'} rounded`}
                                />
                            </th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Asset</th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Holdings</th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Total Current Value</th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Short-term</th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Long-Term</th>
                            <th className={`p-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Amount to Sell</th>
                        </tr>
                    </thead>
                    <tbody className={`${theme === 'dark' ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                        {displayedHoldings.map((holding) => (
                            <HoldingRow
                                key={holding.id}
                                holding={holding}
                                isSelected={holding.isSelected}
                                onSelect={() => handleSelectRow(holding.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {initialHoldings.length > initialDisplayCount && (
                <div className="p-4">
                    <button
                        onClick={toggleShowAllHoldings}
                        className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} font-medium`}
                    >
                        {showAllHoldings ? 'Show less' : 'View all'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HoldingsTable;
