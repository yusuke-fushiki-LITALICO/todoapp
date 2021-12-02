import React, { useState } from 'react';

function Todo(props){
    return(
        <div>
            <label>
                <input type="checkbox" />
                {props.text}
            </label>
        </div>
    );
}

export default Todo;

//子コンポーネントは言われたことだけやる場所だと捉える
//表示部分しか責務を持っていないため、データがどう変化するかは知らなくていい