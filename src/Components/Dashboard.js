import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainContent from './MainContent';
import { useState } from 'react';
const Dashboard = () => {
    const [filterType, setFilterType] = useState(null);

    const handleFilter = (type) => {
        setFilterType(type);
    };

    return (
        <>
            <Sidebar handleFilter={handleFilter} />
            <Navbar/>
            <MainContent filterType={filterType} />
        </>
    );
}

export default Dashboard;
