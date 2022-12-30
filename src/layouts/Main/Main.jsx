import React from 'react';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../LeftSide/Sidebar';
import { Outlet } from 'react-router-dom';

function Main(props) {
    return (
        <div className="AppGlass">
            <Sidebar />
            <Outlet />
            <RightSide />
        </div>
    );
}

export default Main;