import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Home, Auth, Orders, Menu, Dashboard } from './pages'
import Header from './components/Header'
import Tables from './pages/Tables'
import { useSelector } from 'react-redux'
import useLoadData from './hooks/useLoadData'
import FullScreenLOader from './components/shared/FullScreenLOader'
import More from './pages/More'
import UserDetails from './components/shared/UserDetails'

function Loyaout() {
  const location = useLocation();
  const hideHeadersRoutes = ["/auth"];
  const { isAuth } = useSelector((state) => state.user);
  const isLoading=useLoadData();


  if(isLoading) return <FullScreenLOader/>

  return (
    <>

      {!hideHeadersRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
            <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard/>
            </ProtectedRoutes>
          }
        />
            <Route
          path="/more"
          element={
            <ProtectedRoutes>
              <More/>
            </ProtectedRoutes>
          }
        />
             <Route
          path="/userdetails"
          element={
            <ProtectedRoutes>
              <UserDetails/>
            </ProtectedRoutes>
          }
        />
      </Routes>

    </>
  );
}


function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />
  }
  return children;
}

function App() {



  return (
    <Router>
      <Loyaout />
    </Router>
  );
}

export default App
