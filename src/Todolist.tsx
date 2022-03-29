import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Checkbox, collapseClasses, IconButton, List, ToggleButton, ToggleButtonGroup} from "@mui/material";

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

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3 style={{textAlign:"center"}}> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </List>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? "contained" : "outlined"}>All</Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === 'active' ? "contained" : "outlined"}>Active</Button>
            <Button onClick={onCompletedClickHandler} variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed</Button>
        </div>
    </div>
}


