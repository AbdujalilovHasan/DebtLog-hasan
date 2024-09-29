import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/cat.jpg';
import style from './Home.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Home = () => {
  const navigate = useNavigate();
  const [borrowingTotal, setBorrowingTotal] = useState({ count: 0, amount: 0 });
  const [lendingTotal, setLendingTotal] = useState({ count: 0, amount: 0 });

  useEffect(() => {
    const storedDebts = JSON.parse(localStorage.getItem('debts')) || [];

    const borrowingDebts = storedDebts.filter(debt => debt.type === 'borrowing');
    const borrowingCount = borrowingDebts.length;
    const borrowingAmount = borrowingDebts.reduce((total, debt) => total + parseFloat(debt.amount), 0);

    const lendingDebts = storedDebts.filter(debt => debt.type === 'lending');
    const lendingCount = lendingDebts.length;
    const lendingAmount = lendingDebts.reduce((total, debt) => total + parseFloat(debt.amount), 0);

    setBorrowingTotal({ count: borrowingCount, amount: borrowingAmount });
    setLendingTotal({ count: lendingCount, amount: lendingAmount });
  }, []);

  return (
    <div className="container">
      <div className={style["home"]}>
        <h4>Dashboard</h4>
        <div className={style["login-img"]}>
          <button onClick={() => navigate('/LoginPage')} className={style['login-btn']}>
            <img src={img} alt="Login" />
          </button>
        </div>
      </div>
      <div className={style["title"]}>
        <h3>Debt</h3>
      </div>
      <div className={style["stats-section"]}>
        <div className={style["borrowing-stats"]}>
          <h5>
            <i className="bi bi-arrow-down-circle" style={{ marginRight: '8px' }}></i>
            Borrowing
          </h5>
          <p>Total: {borrowingTotal.count} debts</p>
          <p>Total Amount: ${borrowingTotal.amount.toFixed(2)}</p>
        </div>

        <div className={style["lending-stats"]}>
          <h5>
            <i className="bi bi-arrow-up-circle" style={{ marginRight: '8px' }}></i>
            Lending
          </h5>
          <p>Total: {lendingTotal.count} debts</p>
          <p>Total Amount: ${lendingTotal.amount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;