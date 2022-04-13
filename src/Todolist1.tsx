import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Checkbox, collapseClasses, IconButton, List, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {Task} from "./Task";
import StatusButtons from "./StatusButtons";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
}

export function Todolist1(props: PropsType) {
    //Получение данных из state
    let todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(t => t.id === props.id)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    //Фильтрация tasks
    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    //Получение dispatch
    const dispatch=useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.id,title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id,title))
    }

    return <div>
        <h3 style={{textAlign: "center"}}>
            <EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasks.map(t => <Task key={t.id} taskId={t.id} todolistId={props.id} title={t.title} isDone={t.isDone} />)
            }
        </List>
        <StatusButtons todolistId={props.id} filter={todolist.filter}/>
    </div>
}


