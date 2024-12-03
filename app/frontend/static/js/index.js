import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Theme Toggle Component
const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
            {isDark ? '🌞' : '🌙'}
        </button>
    );
};

// Search and Filter Component
const Controls = ({ onSearch, onFilter, onSort, activeFilter, activeSort }) => {
    return (
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="flex-1 max-w-md">
                <input
                    type="text"
                    placeholder="Search VMs..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex space-x-4">
                <select
                    onChange={(e) => onFilter(e.target.value)}
                    value={activeFilter}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    <option value="all">All Servers</option>
                    <option value="montreal">Montreal</option>
                    <option value="washington">Washington</option>
                    <option value="singapore">Singapore</option>
                </select>
                <select
                    onChange={(e) => onSort(e.target.value)}
                    value={activeSort}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    <option value="name">Sort by Name</option>
                    <option value="cpus">Sort by CPUs</option>
                    <option value="ram">Sort by RAM</option>
                </select>
            </div>
        </div>
    );
};

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

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200 dark:border-gray-700">
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
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vm.name}</h3>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vm.server?.name.includes('montreal') ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                        vm.server?.name.includes('washington') ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                    }`}>
                        {vm.server?.name || 'Unknown'}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vm.active ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
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
                        <span className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{vm.cpus}</span>
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
                        <span className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{vm.ram} GB</span>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
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
    );
};

// Main VM Grid Component
const VMGrid = () => {
    const [vms, setVms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSort, setActiveSort] = useState('name');

    const fetchVMs = async () => {
        try {
            const response = await fetch('/api/vms/');
            if (!response.ok) {
                throw new Error('Failed to fetch VMs');
            }
            const data = await response.json();
            setVms(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVMs();
    }, []);

    const filteredAndSortedVMs = vms
        .filter(vm => {
            const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'all' || vm.server?.name.includes(activeFilter);
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (activeSort) {
                case 'cpus':
                    return b.cpus - a.cpus;
                case 'ram':
                    return b.ram - a.ram;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading VMs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-200">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
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
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedVMs.map((vm) => (
                    <VMCard key={vm.id} vm={vm} onEdit={fetchVMs} />
                ))}
            </div>
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