import { FaShoppingBasket } from "react-icons/fa";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar 
      style={{ 
        background: 'linear-gradient(to right, var(--color-green), var(--color-blue))'
      }} 
      variant="dark" 
      expand="lg" 
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <FaShoppingBasket size={24} className="me-2" style={{ color: 'var(--color-yellow)' }} />
          <span className="fw-bold">Grocery Expense Tracker</span>
        </Navbar.Brand>
        <span className="text-light d-none d-md-block">
          Track your grocery spending with ease
        </span>
      </Container>
    </Navbar>
  );
};

export default Header;

