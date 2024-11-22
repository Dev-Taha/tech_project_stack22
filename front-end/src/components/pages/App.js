import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../css/global.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; 
import Login from './login'; 
import FormRegistre from './User/FormRegistre';
import FormAdminRegistre from './AdminComponents/FormAdminRegister';
import EditUser from './AdminComponents/AdminPages/EditUser';
import AuthProvider from './Auth/AuthProvider';
import PrivateRoute from './Auth/PrivateRoute';
import AuthToken from './Auth/AuthToken';
import ErrorSuccessProvider from './Errors/ErrorSuccessProvider';
import UserProfilepage from './userProfilepage';
import AdminPage from './AdminComponents/AdminPages/AdminPage';
import  Dashboard  from './AdminComponents/AdminPages/DashBoard';
import Messages from './AdminComponents/AdminPages/messages';
import  Security  from './AdminComponents/AdminPages/Security';
import Account from './AdminComponents/AdminPages/Account';
import ErrorPage from './Errors/ErrorPage';

function App() {
  return (
    <div className='App'>
            <Router>
              <ErrorSuccessProvider>
                <AuthProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/signUp" element={<FormRegistre />} />
                              {/* Protected Route */}
                            <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/users" element={<AdminPage />} />
                              <Route path="/addUser" element={<FormAdminRegistre />} />
                              <Route path="/security" element={<Security />} />
                              <Route path="/messages" element={<Messages />} />
                              <Route path="/account" element={<Account />} />
                              {/* <Route path="/dashboard/page/:pageNo" element={<Admin />} /> */}
                            </Route>
                            <Route path="*" element={<ErrorPage />} />

                            <Route path="/user" element={<UserProfilepage />} />
                            <Route path="/auth/token" element={<AuthToken />} />
                            {/* <Route path="/userList" element={<AdminUserList />} /> */}
                            <Route path="/editUser/:id" element={<EditUser />} />
                        </Routes>
                  </AuthProvider>
              </ErrorSuccessProvider>
            </Router>
    </div>
  );
}

export default App;
