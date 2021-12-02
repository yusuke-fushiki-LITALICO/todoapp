import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import {CgClose} from "react-icons/cg"
import styled from 'styled-components';

// CSSスタイリング＝＝＝＝＝＝＝＝＝
// 入力フォームーーーーー
const Form = styled.form`
  input{
    width: 100%;
    height: 40px;
    padding-left: 8px;
    border: 0px none;
    border-bottom: 1px solid #f2f2f2;
    font-size: 16px;
    box-sizing: border-box;
    ::placeholder{
      color: #e0e0e0;
    }
    &:focus{
      outline: none;
      border-bottom: 2px solid #2D9CDB;
    }
  }
`;

// Todoリストーーーーー
const TodoList = styled.ul`
  list-style: none;
  padding: 0px;
  width: 100%;
  margin: 0px;
  li{
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #f2f2f2;
    margin-top: 8px;
    position: relative;
    .CheckBox{
      width: 16px;
      height: 16px;
      float: left;
      margin: 16px 8px 0px;
      cursor : pointer;
    }
    .TodoForm{
      width: 276px;
      height: 46px;
      border: 0px none;
      margin-right: 8px;
      font-size: 16px;
      color: #333;
      &:focus{
        outline: none;
      }
    }
    .Button{
      position: absolute;
      top: 12px;
      left: 328px;
      border: 0px none;
      width: 24px;
      height: 24px;
      padding: 0px;
      background-color: white;
      clear: left;
      cursor : pointer;
    }
  }
`;

// Todoリストの数カウンターーーーーー
const TodoCount = styled.div`
  p{
    margin: 16px 0px 0px;
    font-size: 14px;
  }
`;


// Reactコンポーネント＝＝＝＝＝＝＝＝＝
function App() {
  const [task, setTask] = useState({name:'',completed:false});
  const [todos, setTodo] = useState([]);

  // 入力フォームの情報更新ーーーーーー
  const handleNewTask = (event) => {
    setTask({name:event.target.value,completed:false})
  }

  // 入力フォームが送信された時ーーーーーー
  const handleSubmit = (event) => {
    event.preventDefault();
    if(task.name === '') return;
    addTodo(task);
    resetTask();
  }

  const resetTask = () => {
    setTask({name:'',completed:false})
  }

  // Todoリストへの追加ーーーーーー
  const addTodo = (todo) => {
    setTodo(todos => [...todos,todo])
  }

  // 入力フォームが削除された時ーーーーーー
  const handleRemoveTask = (index) => {
    const RemoveTodos = [...todos]
    RemoveTodos.splice(index,1)
    setTodo(RemoveTodos)
  }

  // Todoの情報が更新された時ーーーーーー
  const updateTodo = (event,todoindex) => {
    const newTodo = event.target.value;
    const newTodos = todos.map((todo,index) =>
      todoindex === index ? {name:newTodo,completed:todo.completed}:todo
    );
    setTodo(newTodos);
  }

  // チェックボックスの更新ーーーーーー
  const handleChangeCompleted = (event,todoindex) => {
    const newCompleted = event.target.checked;
    const newTodos = todos.map((todo,index) =>
      // 書き換えるのではなく新しsetStateで更新することが大事
      todoindex === index ? {name:todo.name,completed:newCompleted}:todo
    );
    setTodo(newTodos);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="task_name"
            value={task.name}
            placeholder="What need to be done?" 
            onChange={handleNewTask}
        />
      </Form>
      <TodoList>
        {todos.map((todo,index) => 
          <li key={index}>
            <label>
              <input className='CheckBox'
                type="checkbox"
                checked={todo.completed}
                onChange={(event) => handleChangeCompleted(event,index)}
              />
              <input className='TodoForm'
                type="text" 
                value={todo.name}
                onChange={(event) => updateTodo(event,index)}
                style = {todo.completed ? {textDecoration:'line-through'}:{textDecoration:'none'}}
              />
            </label>
            <button className="Button" onClick={() => handleRemoveTask(index)}>
              <IconContext.Provider value={{size:'24px', color:'#333'}}>
                <CgClose />
              </IconContext.Provider>
            </button>
          </li>
        )}
      </TodoList>
      <TodoCount>
        <p>todoアイテム数{todos.length}</p>
      </TodoCount>
    </div>
  );
}

export default App;