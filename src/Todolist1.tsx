import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Checkbox, collapseClasses, IconButton, List, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/task-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
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

    const onAllClickHandler = () => dispatch(changeFilterAC( props.id,"all"))
    const onActiveClickHandler = () => dispatch(changeFilterAC( props.id,"active"))
    const onCompletedClickHandler = () => dispatch(changeFilterAC( props.id,"completed"))

    return <div>
        <h3 style={{textAlign: "center"}}><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </List>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? "contained" : "outlined"}>All</Button>
            <Button onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? "contained" : "outlined"}>Active</Button>
            <Button onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed</Button>
        </div>
    </div>
}


