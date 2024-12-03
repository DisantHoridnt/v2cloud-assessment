import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const ServerBadge = ({ server }) => {
    const getServerColor = (serverName) => {
        if (serverName.includes('montreal')) return 'bg-blue-100 text-blue-800';
        if (serverName.includes('washington')) return 'bg-green-100 text-green-800';
        if (serverName.includes('singapore')) return 'bg-purple-100 text-purple-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getServerColor(server)}`}>
            {server}
        </span>
    );
};

const VMCard = ({ vm }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{vm.name}</h3>
                    <ServerBadge server={vm.server?.name || 'Unknown'} />
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${vm.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {vm.active ? 'Active' : 'Inactive'}
                </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">CPUs</span>
                    <span className="mt-1 text-lg font-semibold text-gray-900">{vm.cpus}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">RAM</span>
                    <span className="mt-1 text-lg font-semibold text-gray-900">{vm.ram} GB</span>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-gray-500">SSH Key</span>
                <div className="mt-1">
                    {vm.ssh_key ? (
                        <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-50 px-2 py-1 rounded font-mono text-gray-600 flex-1 truncate">
                                {vm.ssh_key}
                            </code>
                            <button 
                                onClick={() => navigator.clipboard.writeText(vm.ssh_key)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                                title="Copy SSH Key"
                            >
                                📋
                            </button>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-400">No key configured</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const VMGrid = () => {
    const [vms, setVms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVMs();
    }, []);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-pulse text-gray-500">Loading VMs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Virtual Machines</h1>
                <div className="text-sm text-gray-500">
                    {vms.length} VMs total
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vms.map((vm) => (
                    <VMCard key={vm.id} vm={vm} />
                ))}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <VMGrid />
        </div>
    );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);