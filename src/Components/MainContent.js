import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTicket, fetchTickets, editTicket, addTicket } from '../features/ticketActions';
import { FaTrash, FaEye, FaEdit, FaPlus } from 'react-icons/fa';

const MainContent = ({ filterType }) => {
    const dispatch = useDispatch();
    const { data: tickets } = useSelector(state => state);
    const [search, setSearch] = useState("");
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [editedTicket, setEditedTicket] = useState({});
    const [newTicket, setNewTicket] = useState({
        Username: '',
        Email: '',
        Description: '',
        Status: '',
        QueryHandler: '',
    });    

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const handleDelete = (email) => {
        dispatch(deleteTicket(email));
    };

    const handleViewDetails = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseDetails = () => {
        setSelectedTicket(null);
        setEditMode(false);
        setAddMode(false);
        setEditedTicket({});
        setNewTicket({
            Username: '',
            Email: '',
            Description: '',
            Status: '',
            QueryHandler: '',
        });
    };

    const handleEdit = (ticket) => {
        setEditMode(true);
        setEditedTicket(ticket);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(editTicket(editedTicket));
        setEditMode(false);
        setEditedTicket({});
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        dispatch(addTicket(newTicket));
        setAddMode(false);
        setNewTicket({
            Username: '',
            Email: '',
            Description: '',
            Status: 'Open',
            QueryHandler: '',
        });
    };

    const renderDescription = (description) => {
        const words = description.split(' ').slice(0, 3).join(' ');
        return words + (description.length > words.length ? '...' : '');
    };

    const filteredData = tickets.filter(item => {
        const matchesStatus = (
            filterType === 'open' ? item.Status === 'Open' :
            filterType === 'closed' ? item.Status === 'Closed' :
            filterType === 'inProgress' ? item.Status === 'In Progress' :
            true
        );

        const matchesSearch = item.Username.toLowerCase().includes(search.toLowerCase()) ||
            item.Email.toLowerCase().includes(search.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
        <main className="ml-60 p-8">
            <div className='flex'>
                <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                    className="bg-green-500 text-white p-2 rounded-md flex items-center hover:bg-green-600 ml-auto"
                    onClick={() => setAddMode(true)}
                >
                    <FaPlus className="mr-2"/> Add Ticket
                </button>
            </div>

            
            {addMode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Add Ticket</h2>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    value={newTicket.Username}
                    onChange={handleAddChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={newTicket.Email}
                        onChange={handleAddChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="Description"
                        placeholder="Description"
                        value={newTicket.Description}
                        onChange={handleAddChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                    name="Status"
                    value={newTicket.Status}
                    onChange={handleAddChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                    <option value="" disabled selected>Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="In Progress">In Progress</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Query Handler</label>
                    <input
                    type="text"
                        name="QueryHandler"
                        placeholder="Query Handler"
                        value={newTicket.QueryHandler}
                        onChange={handleAddChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Ticket</button>
                <button type="button" onClick={handleCloseDetails} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Cancel</button>
                </div>
            </form>
            </div>
            </div>
            )}
            {editMode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Edit Ticket</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="Username"
                            value={editedTicket.Username}
                            onChange={handleEditChange}
                            placeholder="Username"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={editedTicket.Email}
                        onChange={handleEditChange}
                        placeholder="Email"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    name="Description"
                    value={editedTicket.Description}
                    onChange={handleEditChange}
                    placeholder="Description"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    name="Status"
                    value={editedTicket.Status}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="In Progress">In Progress</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Query Handler</label>
                <input
                    type="text"
                    name="QueryHandler"
                    value={editedTicket.QueryHandler}
                    onChange={handleEditChange}
                    placeholder="Query Handler"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                </div>
                <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Save</button>
                <button type="button" onClick={handleCloseDetails} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Cancel</button>
                </div>
                </form>

            </div>
            </div>
            )}

            <div className="bg-white p-6 shadow-md rounded-lg overflow-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Username</th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Description</th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Query Handler</th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr className="hover:bg-gray-200 transition duration-200">
                                    <td className="py-2 px-4 border-b border-gray-200">{item.Username}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{item.Email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {selectedTicket === item ? item.Description : renderDescription(item.Description)}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">{item.Status}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{item.QueryHandler}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                                        <FaEye
                                            className="text-blue-500 hover:text-blue-600 cursor-pointer"
                                            onClick={() => handleViewDetails(item)}
                                        />
                                        <FaEdit
                                            className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                                            onClick={() => handleEdit(item)}
                                        />
                                        <FaTrash
                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(item.Email)}
                                        />
                                    </td>
                                </tr>
                                {selectedTicket === item && (
                                    <tr>
                                        <td colSpan="6" className="border-t border-gray-200 p-4">
                                            <h2 className="text-lg font-semibold mb-2">Ticket Details</h2>
                                            <div className="mb-2"><strong>Username:</strong> {item.Username}</div>
                                            <div className="mb-2"><strong>Email:</strong> {item.Email}</div>
                                            <div className="mb-2"><strong>Description:</strong> {item.Description}</div>
                                            <div className="mb-2"><strong>Status:</strong> {item.Status}</div>
                                            <div className="mb-2"><strong>Query Handler:</strong> {item.QueryHandler}</div>
                                            <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseDetails}>Close</button>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default MainContent;
