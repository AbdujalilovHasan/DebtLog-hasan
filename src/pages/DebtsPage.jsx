import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import DebtItem from '../components/card/DebtCard';

function DebtsPage() {
  const [show, setShow] = useState(false);
  const [view, setView] = useState('borrowing');
  const [debts, setDebts] = useState(() => {
    const storedDebts = localStorage.getItem('debts');
    return storedDebts ? JSON.parse(storedDebts) : [];
  });
  const [newDebt, setNewDebt] = useState({ id: '', name: '', surname: '', phone: '', amount: '', date: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setNewDebt({ id: '', name: '', surname: '', phone: '', amount: '', date: '', type: '' });
  };

  const handleAddDebt = (e) => {
    e.preventDefault();
    if (newDebt.name && newDebt.surname && newDebt.phone && newDebt.amount) {
      const updatedDebts = newDebt.id
        ? debts.map(debt => debt.id === newDebt.id ? { ...newDebt, date: debt.date, type: view } : debt)
        : [
            ...debts,
            {
              ...newDebt,
              id: Date.now(),
              date: new Date().toLocaleDateString(),
              type: view,
            }
          ];

      setDebts(updatedDebts);
      localStorage.setItem('debts', JSON.stringify(updatedDebts));
      handleClose();
    }
  };

  const handleDeleteDebt = (id) => {
    const updatedDebts = debts.filter((debt) => debt.id !== id);
    setDebts(updatedDebts);
    localStorage.setItem('debts', JSON.stringify(updatedDebts));
  };

  const handleEditDebt = (id) => {
    const debtToEdit = debts.find(debt => debt.id === id);
    if (debtToEdit) {
      setNewDebt(debtToEdit); 
      handleShow();
    }
  };

  const filteredDebts = debts.filter(
    (debt) =>
      debt.type === view &&
      (debt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.surname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Active and inactive button styles
  const activeButtonStyle = {
    backgroundColor: '#486694',
    color: '#fff',
    borderColor: '#486694',
  };

  const inactiveButtonStyle = {
    backgroundColor: '#fff',
    color: '#486694',
    borderColor: '#486694',
  };

  return (
    <div className="w-75 mx-auto">
      <h1 className="mb-4">Debts</h1>

      <ButtonGroup className="mb-3">
        <Button
          style={view === 'borrowing' ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setView('borrowing')}
        >
          Borrowing
        </Button>
        <Button
          style={view === 'lending' ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setView('lending')}
        >
          Lending
        </Button>
      </ButtonGroup>

      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="me-2" style={{ flex: 1 }}>
          <Form.Control
            placeholder={`Search ${view === 'borrowing' ? 'Borrowing' : 'Lending'} by name or surname`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button style={activeButtonStyle} onClick={handleShow}>
          Add {view === 'borrowing' ? 'Borrowing' : 'Lending'}
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{newDebt.id ? `Edit ${view === 'borrowing' ? 'Borrowing' : 'Lending'}` : `Add New ${view === 'borrowing' ? 'Borrowing' : 'Lending'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddDebt}>
            <Form.Group controlId="formDebtName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newDebt.name}
                onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                required
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formDebtSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                value={newDebt.surname}
                onChange={(e) => setNewDebt({ ...newDebt, surname: e.target.value })}
                required
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formDebtPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="+998(00)000-00-00"
                value={newDebt.phone}
                onChange={(e) => setNewDebt({ ...newDebt, phone: e.target.value })}
                required
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formDebtAmount">
              <Form.Label>Debt Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={newDebt.amount}
                onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
                required
                className="mb-3"
              />
            </Form.Group>
            <Button style={activeButtonStyle} type="submit" className="mt-3">
              {newDebt.id ? 'Update Debt' : 'Add Debt'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {filteredDebts.map((debt) => (
        <DebtItem
          key={debt.id}
          id={debt.id}
          firstName={debt.name}
          lastName={debt.surname}
          phone={debt.phone}
          debt={`$${debt.amount}`}
          date={debt.date}
          deleteDebt={handleDeleteDebt}
          editDebt={handleEditDebt}
        />
      ))}
    </div>
  );
}

export default DebtsPage;