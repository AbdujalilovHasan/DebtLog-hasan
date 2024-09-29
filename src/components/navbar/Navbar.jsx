import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3 border-end" style={{ width: '250px' }}>
      <h4 style={{ color: '#2C4371' }} className="mb-4 cursor-pointer">
        <i className="bi bi-bank"></i> DebtLog
      </h4>
      <Nav className="flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link text-dark fw-bold mb-2 ${isActive ? 'active-link' : ''}`
          }
        >
          <i className="bi bi-house me-2"></i> Home
        </NavLink>
        <NavLink
          to="/DebtsPage"
          className={({ isActive }) =>
            `nav-link text-dark fw-bold mb-2 ${isActive ? 'active-link' : ''}`
          }
        >
          <i className="bi bi-cash-coin me-2"></i> Debts
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `nav-link text-dark fw-bold mb-2 ${isActive ? 'active-link' : ''}`
          }
        >
          <i className="bi bi-box-seam me-2"></i> Transactions
        </NavLink>
        <NavLink
          to="/LoginPage"
          className={({ isActive }) =>
            `nav-link text-dark fw-bold mb-2 ${isActive ? 'active-link' : ''}`
          }
          onClick={onLogout}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i> Login
        </NavLink>
      </Nav>
    </div>
  );
};

export default Navbar;