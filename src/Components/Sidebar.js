import React from 'react';

const Sidebar = ({ handleFilter }) => {
    const handleClick = (filterType) => {
        handleFilter(filterType);
    };

    return (
        <section id="sideMenu" className="bg-gray-200 w-60 top-0 bottom-0 fixed shadow-lg">
            <nav className="mt-4 ">
                <div className="flex items-center p-2 border-b border-blue-200">
                    <h2 className="text-gray-700 text-xl font-semibold">Ticketing-app</h2>
                </div>
                <a  className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('inProgress')}>
                    <span>In Progress</span>
                </a>
                <a  className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('open')}>
                    <span>Open</span>
                </a>
                <a className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('closed')}>
                    <span>Closed</span>
                </a>
                <a className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('createdByMe')}>
                    <span>All</span>
                </a>
            </nav>
        </section>
    );
}

export default Sidebar;
