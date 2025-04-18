import { useState } from 'react';
import './App.css';
import GroceryProvider from './context/GroceryContext';
import Header from './components/Header';
import GroceryForm from './components/GroceryForm';
import GroceryList from './components/GroceryList';
import GrocerySummary from './components/GrocerySummary';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';

function App() {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'summary'

  return (
    <GroceryProvider>
      <div className="min-vh-100 bg-light">
        <Header />
        
        <Container className="py-4">
          {/* Mobile Navigation Tabs */}
          <div className="d-md-none mb-4">
            <Tab.Container id="mobile-tabs" activeKey={activeTab} onSelect={setActiveTab}>
              <Nav variant="pills" className="bg-white rounded shadow" fill>
                <Nav.Item>
                  <Nav.Link eventKey="list">List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="add">Add Item</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="summary">Summary</Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="list">
                  <GroceryList />
                </Tab.Pane>
                <Tab.Pane eventKey="add">
                  <GroceryForm />
                </Tab.Pane>
                <Tab.Pane eventKey="summary">
                  <GrocerySummary />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
          
          {/* Desktop View - Grid Layout */}
          <div className="d-none d-md-block">
            <Row>
              <Col md={4} lg={3}>
                <GroceryForm />
                <div className="mt-4">
                  <GrocerySummary />
                </div>
              </Col>
              <Col md={8} lg={9}>
                <GroceryList />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </GroceryProvider>
  );
}

export default App;