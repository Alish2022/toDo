import React, { useCallback} from 'react';
import { TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, List} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/task-reducer";
import {changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import StatusButtons from "./StatusButtons";
import Tasks from "./Tasks";
import EditableSpanContainer from "./EditableSpanContainer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
}

export const Todolist1 = React.memo((props: PropsType) => {
    console.log('todolist')

    //Получение dispatch
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [props.id, dispatch])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }

    return <div>
        <h3 style={{textAlign: "center"}}>
            <EditableSpanContainer todolistId={props.id}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
           <Tasks id={props.id}/>
        </List>
        <StatusButtons todolistId={props.id}/>
    </div>
})


