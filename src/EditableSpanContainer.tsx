import React, {useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./App";
import {changeTodolistTitleAC} from "./state/todolist-reducer";

type propsType={
    todolistId:string
}

const EditableSpanContainer =React.memo( (props:propsType) => {

    const dispatch=useDispatch()

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, title))
    },[dispatch,props.todolistId])

    let todolistTitle = useSelector<AppRootStateType, string>(state => state.todolists.filter(t => t.id === props.todolistId)[0].title)

    return (
        <div>
            <EditableSpan value={todolistTitle} onChange={changeTodolistTitle}/>
        </div>
    );
})

export default EditableSpanContainer;