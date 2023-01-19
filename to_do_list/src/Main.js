import React from 'react';
import { Link } from 'react-router-dom';
import './style/Main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = (props) => {
	const [mode, setMode] = useState("WELCOME");

	const [toDoList, setToDoList] = useState([]);
	const [detailTitle, setDetailTitle] = useState([]);
	const [detailContext, setDetailContext] = useState([]);


	const [toDo, setTodo] = useState(" ");
	const [toDoDetail, setTodoDetail] = useState(" ");



	useEffect(() => {

		const fetchTodos = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/todos'
				);
				setToDoList(response.data.data);
			} catch (e) {
				console.log(e);
			}
		}

		fetchTodos();
	}, []);


	return (
		<div className="App">

			<div id="wrapperTodo">
				<div id="header">
					<h3 id="title">To Do List</h3>
					<div></div>
				</div>
				<Link to="/create/" style={{ textDecoration: 'none' }}>
					<div id='addBtnWrapper' style={{ display: "flex" }}>
						<div id="addBtn">+</div>
					</div>
				</Link>
				<div id="detailTodoWrapper">
					{toDoList.length > 0 && toDoList.map((todo) =>
						<Link to={`/detail/${todo.id}`} style={{ textDecoration: 'none' }}>
							<div
								id="detailTodo"
								onClick={() => {
									setDetailTitle(todo.title);
									setDetailContext(todo.content);
								}}>
								{todo.title}
							</div>
						</Link>
					)}</div>
			</div>
		</div>
	);
};

export default Main;