import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// Utility function for error handling
const handleApiError = (error, setError) => {
    console.error('API Error:', error);
    setError(error.message || 'An unexpected error occurred');
};

// Theme Toggle Component with Improved Accessibility
const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || 
               (!(savedTheme) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                       text-gray-800 dark:text-white 
                       hover:bg-gray-300 dark:hover:bg-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition-colors duration-300"
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
};

// Controls Component with Enhanced Filtering and Accessibility
const Controls = ({ 
    onSearch, 
    onFilter, 
    onSort, 
    activeFilter, 
    activeSort, 
    totalVMs, 
    filteredVMsCount 
}) => {
    return (
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between mb-6">
            <div className="flex-1 max-w-md">
                <label htmlFor="vm-search" className="sr-only">Search Virtual Machines</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        id="vm-search"
                        type="text"
                        placeholder="Search VMs..."
                        aria-label="Search Virtual Machines"
                        onChange={(e) => onSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 
                                   border border-gray-300 dark:border-gray-600 
                                   rounded-md leading-5 
                                   bg-white dark:bg-gray-700 
                                   text-gray-900 dark:text-white 
                                   placeholder-gray-500 dark:placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   transition-colors duration-200"
                    />
                </div>
            </div>

            <div className="flex space-x-4 mt-4 sm:mt-0">
                <div>
                    <label htmlFor="server-filter" className="sr-only">Filter by Server</label>
                    <select
                        id="server-filter"
                        onChange={(e) => onFilter(e.target.value)}
                        value={activeFilter}
                        aria-label="Filter Virtual Machines by Server"
                        className="block w-full pl-3 pr-10 py-2 
                                   border border-gray-300 dark:border-gray-600 
                                   rounded-md leading-5 
                                   bg-white dark:bg-gray-700 
                                   text-gray-900 dark:text-white 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   transition-colors duration-200"
                    >
                        <option value="all">All Servers</option>
                        <option value="montreal">Montreal</option>
                        <option value="washington">Washington</option>
                        <option value="singapore">Singapore</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="vm-sort" className="sr-only">Sort Virtual Machines</label>
                    <select
                        id="vm-sort"
                        onChange={(e) => onSort(e.target.value)}
                        value={activeSort}
                        aria-label="Sort Virtual Machines"
                        className="block w-full pl-3 pr-10 py-2 
                                   border border-gray-300 dark:border-gray-600 
                                   rounded-md leading-5 
                                   bg-white dark:bg-gray-700 
                                   text-gray-900 dark:text-white 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   transition-colors duration-200"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="cpus">Sort by CPUs</option>
                        <option value="ram">Sort by RAM</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

// Loading Skeleton Component
const VMCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse p-6">
        <div className="flex justify-between mb-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
    </div>
);

// VM Card Component
const VMCard = ({ vm, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedVm, setEditedVm] = useState(vm);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/vms/${vm.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedVm),
            });
            if (response.ok) {
                setIsEditing(false);
                onEdit();
            }
        } catch (error) {
            console.error('Error updating VM:', error);
        }
    };

    // Determine server color
    const getServerColor = () => {
        if (vm.server?.name.toLowerCase().includes('montreal')) {
            return {
                bg: 'bg-blue-50 dark:bg-blue-900/30',
                border: 'border-blue-200 dark:border-blue-700',
                text: 'text-blue-800 dark:text-blue-300'
            };
        }
        if (vm.server?.name.toLowerCase().includes('washington')) {
            return {
                bg: 'bg-green-50 dark:bg-green-900/30',
                border: 'border-green-200 dark:border-green-700',
                text: 'text-green-800 dark:text-green-300'
            };
        }
        return {
            bg: 'bg-purple-50 dark:bg-purple-900/30',
            border: 'border-purple-200 dark:border-purple-700',
            text: 'text-purple-800 dark:text-purple-300'
        };
    };

    const serverColors = getServerColor();

    return (
        <div className={`
            relative group
            ${serverColors.bg}
            border-2 ${serverColors.border}
            rounded-xl overflow-hidden
            transition-all duration-300
            hover:shadow-lg hover:scale-[1.02]
        `}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                from-blue-500 via-purple-500 to-pink-500 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300">
            </div>
            
            <div className="p-6 relative z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedVm.name}
                                onChange={(e) => setEditedVm({...editedVm, name: e.target.value})}
                                className="text-lg font-semibold px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        ) : (
                            <h3 className={`text-lg font-semibold ${serverColors.text}`}>{vm.name}</h3>
                        )}
                        <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${serverColors.bg} ${serverColors.text} mt-1
                        `}>
                            {vm.server?.name || 'Unknown'}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${vm.active 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            }
                        `}>
                            {vm.active ? 'Active' : 'Inactive'}
                        </span>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {isEditing ? '✕' : '✎'}
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">CPUs</span>
                        {isEditing ? (
                            <input
                                type="number"
                                value={editedVm.cpus}
                                onChange={(e) => setEditedVm({...editedVm, cpus: parseInt(e.target.value)})}
                                className="mt-1 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        ) : (
                            <span className={`mt-1 text-lg font-semibold ${serverColors.text}`}>{vm.cpus}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM</span>
                        {isEditing ? (
                            <input
                                type="number"
                                value={editedVm.ram}
                                onChange={(e) => setEditedVm({...editedVm, ram: parseInt(e.target.value)})}
                                className="mt-1 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        ) : (
                            <span className={`mt-1 text-lg font-semibold ${serverColors.text}`}>{vm.ram} GB</span>
                        )}
                    </div>
                </div>

                <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">SSH Key</span>
                    <div className="mt-1">
                        {isEditing ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editedVm.ssh_key || ''}
                                    onChange={(e) => setEditedVm({...editedVm, ssh_key: e.target.value})}
                                    className="flex-1 px-2 py-1 text-xs font-mono border rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter SSH key"
                                />
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            vm.ssh_key ? (
                                <div className="flex items-center space-x-2">
                                    <code className="text-xs bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded font-mono text-gray-600 dark:text-gray-300 flex-1 truncate">
                                        {vm.ssh_key}
                                    </code>
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(vm.ssh_key)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                        title="Copy SSH Key"
                                    >
                                        📋
                                    </button>
                                </div>
                            ) : (
                                <span className="text-sm text-gray-400 dark:text-gray-500">No key configured</span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main VM Grid Component with Improved State Management
const VMGrid = () => {
    const [vms, setVms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSort, setActiveSort] = useState('name');

    const fetchVMs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/vms/');
            if (!response.ok) {
                throw new Error('Failed to fetch VMs');
            }
            const data = await response.json();
            setVms(data);
        } catch (err) {
            handleApiError(err, setError);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVMs();
    }, [fetchVMs]);

    const filteredAndSortedVMs = useMemo(() => {
        return vms
            .filter(vm => {
                const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesFilter = activeFilter === 'all' || vm.server?.name.toLowerCase().includes(activeFilter);
                return matchesSearch && matchesFilter;
            })
            .sort((a, b) => {
                switch (activeSort) {
                    case 'cpus': return b.cpus - a.cpus;
                    case 'ram': return b.ram - a.ram;
                    default: return a.name.localeCompare(b.name);
                }
            });
    }, [vms, searchTerm, activeFilter, activeSort]);

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-200">
                <h2 className="text-lg font-semibold mb-2">Error Loading VMs</h2>
                <p>{error}</p>
                <button 
                    onClick={fetchVMs} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Virtual Machines</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredAndSortedVMs.length} of {vms.length} VMs
                </div>
            </div>

            <Controls
                onSearch={setSearchTerm}
                onFilter={setActiveFilter}
                onSort={setActiveSort}
                activeFilter={activeFilter}
                activeSort={activeSort}
                totalVMs={vms.length}
                filteredVMsCount={filteredAndSortedVMs.length}
            />

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {[...Array(8)].map((_, index) => (
                        <VMCardSkeleton key={index} />
                    ))}
                </div>
            ) : filteredAndSortedVMs.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    <p className="text-xl mb-4">No VMs found</p>
                    <p>Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filteredAndSortedVMs.map((vm) => (
                        <VMCard key={vm.id} vm={vm} onEdit={fetchVMs} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Initialize Theme Toggle
const themeContainer = document.getElementById('theme-toggle');
const themeRoot = createRoot(themeContainer);
themeRoot.render(<ThemeToggle />);

// Initialize Main App
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<VMGrid />);