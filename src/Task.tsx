import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";

type propsType={
    taskId: string
    todolistId: string
    isDone:boolean
    title:string
}

export const Task=React.memo((props:propsType)=>{
    console.log('task')
    const dispatch=useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId,id))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId,id,isDone))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(todolistId,id,newTitle))
    }

    const onClickHandler = () => removeTask(props.taskId, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeStatus(props.taskId, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(props.taskId, newValue, props.todolistId);
    }

    return <li key={props.taskId} className={props.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.isDone}/>
        <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </li>
})