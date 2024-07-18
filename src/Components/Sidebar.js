import React from 'react';

const Sidebar = ({ handleFilter }) => {
    const handleClick = (filterType) => {
        handleFilter(filterType);
    };

    return (
        <section id="sideMenu" className="bg-gray-200 w-60 fixed top-0 bottom-0 shadow-lg">
            <nav className="mt-4">
                <div className="flex items-center p-2 border-b border-blue-200">
                    <i className="fa fa-home text-green-500 mr-3" aria-hidden="true" />
                    <h2 className="text-gray-700 text-xl font-semibold">Ticketing-app</h2>
                </div>
                <a href="#" className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('inProgress')}>
                    <i className="fa fa-sticky-note-o text-green-500 mr-3" aria-hidden="true" />
                    <span>In Progress</span>
                </a>
                <a href="#" className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('open')}>
                    <i className="fa fa-bookmark-o text-green-500 mr-3" aria-hidden="true" />
                    <span>Open</span>
                </a>
                <a href="#" className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('closed')}>
                    <i className="fa fa-calendar-check-o text-green-500 mr-3" aria-hidden="true" />
                    <span>Closed</span>
                </a>
                <a href="#" className="flex items-center p-4 border-l-4 border-transparent text-gray-900 hover:bg-blue-200 hover:border-blue-400 transition-colors duration-300" onClick={() => handleClick('createdByMe')}>
                    <i className="fa fa-user-circle-o text-green-500 mr-3" aria-hidden="true" />
                    <span>All</span>
                </a>
            </nav>
        </section>
    );
}

export default Sidebar;
