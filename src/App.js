import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from './components/loading/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DebtsPage = lazy(() => import('./pages/DebtsPage'));
const Home = lazy(() => import('./components/home/Home')); // Import Home component
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const IS_LOGIN = 'is_login';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem(IS_LOGIN);
    if (loginStatus === '1') {
      setIsLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem(IS_LOGIN, '1');
  };

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem(IS_LOGIN);
  };

  return (
    <Suspense fallback={<Loading heightStyle="100vh" classStyle="bg-primary" />}>
      <BrowserRouter>
        <ToastContainer />
        <div className="w-100">
          <Routes>
            <Route
              path="/LoginPage"
              element={isLogin ? <Navigate to="/" /> : <LoginPage setIsLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                isLogin ? <HomePage onLogout={handleLogout} /> : <Navigate to="/LoginPage" />
              }
            >
              <Route index element={<Home />} />
              <Route path="DebtsPage" element={<DebtsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
