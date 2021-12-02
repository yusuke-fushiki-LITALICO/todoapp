import React, { useState } from 'react';

function Form(){
    //入力フォームの初期値と変数
    const [task, setTask] = useState('');

    const handleNewTask = (event) => {
        //Hooksを使わないならsetStateを使う感じ
        setTask(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(task === '') return;
        //Submitしたら中身を消す
        setTask('');
    }

    return(
        //onSubmitは送信した時に読まれる
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value = {task}
                placeholder="What need to be done?" 
                //文字入力して変わった時に読まれる
                onChange={handleNewTask}
            />
        </form>
    );

    
}

export default Form;

//14分から確認