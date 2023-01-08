import React from 'react';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../LeftSide/Sidebar';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';

function Main(props) {
    
    return (
        <div className="AppGlass">
            <Sidebar />
            <ProtectedRoute>
            <Outlet />
            </ProtectedRoute>
            <RightSide />
        </div>
    );
}

export default Main;