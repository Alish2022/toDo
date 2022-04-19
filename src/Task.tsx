import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";

type propsType = {
    taskId: string
    todolistId: string
    isDone: boolean
    title: string
}

export const Task = React.memo((props: propsType) => {
    console.log('task')
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.taskId))
    },[props.todolistId,props.taskId,dispatch])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.taskId, newValue))
    },[props.todolistId,props.taskId,dispatch])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.todolistId, props.taskId, newIsDoneValue))
    },[props.todolistId,props.taskId,dispatch])

    return (
        <>
            <Checkbox onChange={onChangeHandler} checked={props.isDone}/>
            <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </>


    )
})