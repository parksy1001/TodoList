import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style/Edit.css';

const Edit = (props) => {

  const navigate = useNavigate();

  const [todoTitle, setTodoTitle] = useState("")
  const [todoContent, setTodoContent] = useState("")
  //const [todoId,setTodoID] = useState("")

  const { id } = useParams();


  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/todos/${id}`
        );

        setTodoTitle(response.data.data.title);
        setTodoContent(response.data.data.content);
        //setTodoID(id);
      } catch (e) {
        console.log(e);
      }
    }

    fetchTodos();
  }, []);

  const editTodo = (evt) => {

    evt.preventDefault();

    axios.put(`http://localhost:8080/todos//${id}`,
      {
        "title": todoTitle,
        "content": todoContent
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className='Edit'>
      <div id="detailWrapper">
        <div id="backHeader">
          <div id="backBtn" onClick={() => { navigate(-1); }}>
            {'<'}
          </div>
        </div>
        <div id="titleHeader" >수정하기</div>
        <input
          id="editTitle"
          value={todoTitle}
          type="text"
          spellCheck="false"
          onChange={e => setTodoTitle(e.target.value)} /><br />
        <textarea
          id="editContent"
          value={todoContent}
          spellCheck="false"
          onChange={e => setTodoContent(e.target.value)}></textarea>
        <div id="idBlock"> {id}</div>
        <div id="saveBtn" onClick={editTodo}>저장</div>
      </div>
    </div>
  );
}

export default Edit;