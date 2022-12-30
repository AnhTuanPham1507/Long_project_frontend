import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../imgs/mylogo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove } from '../../redux/slices/TokenSlice'

const Sidebar = () => {
  const [expanded, setExpaned] = useState(true)

  const dispatch = useDispatch()

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  function logOut() {
    dispatch(remove())
  }

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link
                className="menuItem"
                key={index}
                to={item.to}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={logOut}>
            <UilSignOutAlt /> Log out
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
