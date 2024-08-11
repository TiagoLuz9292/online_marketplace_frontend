import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AuthModal from './Auth/AuthModal';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleModal = () => setModalOpen(!modalOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        toast.success('Logout successful');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#333333', color: '#ffffff' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: '#ffffff' }}>Online Marketplace</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-product" style={{ color: '#ffffff', fontSize: '18px' }}>Add Product</Link>
                            </li>
                        )}
                    </ul>
                    <form className="d-flex search-bar-container">
                        <FaSearch className="search-icon" />
                        <input
                            className="form-control me-2 search-input"
                            type="search"
                            aria-label="Search"
                        />
                    </form>
                    <div className="ms-auto">
                        {isLoggedIn ? (
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="user-menu">
                                <DropdownToggle
                                    tag="span"
                                    data-toggle="dropdown"
                                    aria-expanded={dropdownOpen}
                                    style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '50%', backgroundColor: '#333', color: '#fff' }}
                                >
                                    <FaUserCircle size={30} />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => navigate('/my-products')}>My Products</DropdownItem>
                                    <DropdownItem onClick={() => navigate('/payment-methods')}>Payment Methods</DropdownItem>
                                    <DropdownItem onClick={() => navigate('/profile')}>Account Settings</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <>
                                <button className="btn btn-outline-primary me-2" onClick={toggleModal}>Register</button>
                                <button className="btn btn-outline-primary" onClick={toggleModal}>Login</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <AuthModal isOpen={modalOpen} toggle={toggleModal} />
        </nav>
    );
};

export default Navbar;
