import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Create from './Create';
import Detail from './Detail';
import Edit from './Edit';
import NotFound from './NotFound';


function App() {
	return (
		<BrowserRouter>
			<Routes>
  			<Route path="/" element={<Main />}></Route>
			<Route path="/create" element={<Create />}></Route>
			<Route path="/detail/:id" element={<Detail />}></Route>
			<Route path="/edit/:id" element={<Edit />}></Route>
			<Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
			</Routes>
		</BrowserRouter>

	);
};

export default App;