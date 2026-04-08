'use client'

import React from "react";
import "./navbar.css";
import {useAppSelector} from '@/hooks/use-redux-hook'

const NavBar = () => {

    const {currentUser} = useAppSelector((state) => state.auth)
    return (
        <div className="navbar">
            <div className="title">Online scholarship form</div>
            <div className="user">
                <span className="icon">
                    <img src="user-profile-icon.png" alt="profile" />
                </span>
                <span>{currentUser?.first_name} {currentUser?.last_name}</span>
            </div>
        </div>


    );
};

export default NavBar;