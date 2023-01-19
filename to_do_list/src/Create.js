import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './style/Create.css';

const Create = (props) => {

  const navigate = useNavigate();
  const [todoTitle, setTodoTitle] = useState("")
  const [todoContent, setTodoContent] = useState("")
  const [isModal, setIsModal] = useState(false)

  const createTodo = (evt) => {

    evt.preventDefault();

    if ((todoTitle.length === 0) || (todoContent.length === 0)) {
      setIsModal(true);
      return;
    }


    axios.post('http://localhost:8080/todos',
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
    <div className='Create'>
      <div id="wrapper">
        <div id="backHeader">
          <div id="backBtn" onClick={() => { navigate(-1); }}>{'<'}</div>
        </div>
        <div id="titleHeader" >Todo를 입력하세요</div>
        <input
          id="createTitle"
          type="text"
          spellCheck="false"
          onChange={e => setTodoTitle(e.target.value.trim())}
          placeholder="제목을 입력하세요." /><br />
        <textarea 
          id="createContent" 
          spellCheck="false" 
          onChange={e => setTodoContent(e.target.value.trim())} 
          placeholder="내용을 입력하세요."></textarea><br />
        <div id="createBtn" onClick={createTodo}>추가하기</div>
      </div>


      <Modal
        isOpen={isModal}
        ariaHideApp={false}
        onRequestClose={() => setIsModal(false)}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(204, 204, 204, 0.85)'
          },
          content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
          }
        }}
      >
        <div id="modalWrapper">
          <h3>제목 혹은 내용을 입력하지 않으셨습니다.</h3><br />
          <div id="btnWrapper">
            <div id="confirmBtn" onClick={() => setIsModal(false)}>확인</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Create;