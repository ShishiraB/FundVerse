// Sidebar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun } from '../assets';
import { useStateContext } from '../context';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[50px] ${
      isActive && isActive === name && 'bg-[#2c2f32]'
    } flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const { disconnect, address } = useStateContext();
  const [isActive, setIsActive] = useState('dashboard');

  const handleLogout = async () => {
    if (disconnect) {
      await disconnect();
      setIsActive('dashboard');
      navigate('/');
    }
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[25px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-20">
          {navlinks.map((link) => {
            if (address || link.name === 'dashboard') {
              return (
                <Icon
                  key={link.name}
                  {...link}
                  isActive={isActive}
                  handleClick={() => {
                    if (!link.disabled) {
                      setIsActive(link.name);
                      if (link.name === 'logout') {
                        handleLogout();
                      } else {
                        navigate(link.link);
                      }
                    }
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
