import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ closeMenu, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    toggleMenu();
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? '✕' : '≡'}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <button className="menu-button" onClick={() => handleLinkClick('/')}>Home</button>
            </li>
            <li>
              <button className="menu-button" onClick={() => handleLinkClick('/create-task')}>Create Task</button>
            </li>
            <li>
              <button className="menu-button" onClick={() => handleLinkClick('/history')}>History</button>
            </li>
            {}
          </ul>
          {user && (
            <div className="user-info">
              <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
              <div className="user-details">
                <p className="user-name">{user.displayName}</p>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default SideMenu;