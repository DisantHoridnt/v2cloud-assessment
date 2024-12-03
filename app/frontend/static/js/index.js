import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const VMTable = () => {
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

    if (loading) return <div>Loading VMs...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Virtual Machines</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">CPUs</th>
                        <th className="px-4 py-2 border">RAM (GB)</th>
                        <th className="px-4 py-2 border">Server</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">SSH Key</th>
                    </tr>
                </thead>
                <tbody>
                    {vms.map((vm) => (
                        <tr key={vm.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{vm.name}</td>
                            <td className="px-4 py-2 border">{vm.cpus}</td>
                            <td className="px-4 py-2 border">{vm.ram}</td>
                            <td className="px-4 py-2 border">{vm.server?.name || 'N/A'}</td>
                            <td className="px-4 py-2 border">
                                <span className={`inline-block px-2 py-1 rounded ${vm.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {vm.active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                {vm.ssh_key ? (
                                    <span className="text-sm font-mono bg-gray-100 p-1 rounded">
                                        {vm.ssh_key.substring(0, 20)}...
                                    </span>
                                ) : 'No key'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <VMTable />
        </div>
    );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);