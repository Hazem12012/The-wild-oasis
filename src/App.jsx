import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from "./ui/AppLayout";



function App() {
  return (
<BrowserRouter>
<GlobalStyles/>
<Routes>

<Route element={<AppLayout/>}>
  <Route path="dashboard"  element={<Dashboard/>}/>
  <Route index  element={<Navigate replace to="dashboard"/>}/>
  <Route path="booking" element={<Bookings/>}/>
  <Route path="cabins" element={<Cabins/>}/>
  <Route path="account" element={<Account/>}/>
  <Route path="users" element={<Users/>}/>
  <Route path="settings" element={<Settings/>}/>
</Route>
  <Route path="login" element={<Login/>}/>
  <Route path="*" element={<PageNotFound/>}/>
</Routes>
</BrowserRouter>


  )
}

export default App;
