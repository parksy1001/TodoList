import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './style/Detail.css';

const Detail = (props) => {

  const navigate = useNavigate();

  const [todoTitle, setTodoTitle] = useState("")
  const [todoContent, setTodoContent] = useState("")
  //const [todoId, setTodoID] = useState("")
  const [error, setError] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
        setError(true);
      }
    }

    fetchTodos();

  }, []);



  const deleteTodo = (evt) => {

    //evt.preventDefault(); 

    axios.delete(`http://localhost:8080/todos//${id}`)
      .then((res) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (
    <div className='Detail'>
      {error === false ?
        (<div id="detailWrapper">
          <div id="backHeader">
            <div id="backBtn" onClick={() => { navigate(-1); }}>
              {'<'}
            </div>
          </div>
          <h2>{todoTitle}</h2>
          <hr></hr>
          <pre id="contentBlock">{todoContent}</pre>
          <div id="idBlock"> {id}</div>
          <div id="btnWrapper">
            <div id="editBtn" onClick={() => { navigate(`/edit/${id}`); }}>수정하기</div>
            <div id="deleteBtn" onClick={() => { setModalIsOpen(true) }}>삭제하기</div>
          </div>
        </div>) :
        (<div id="deletedWrapper">
          <h2>존재하지 않는 Todo입니다.</h2>
        </div>)
      }

      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
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
            // padding: '20px'

          }
        }}
      >
        <div id="modalWrapper">
          <h3>정말로 삭제하시겠습니까?</h3><br />
          <div id="btnWrapper">
            <div id="yesBtn" onClick={() => deleteTodo()}>예</div>
            <div id="noBtn" onClick={() => setModalIsOpen(false)}>아니오</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Detail;