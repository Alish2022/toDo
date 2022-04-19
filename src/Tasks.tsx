import React from 'react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist1";
import {FilterValuesType} from "./App";

type propsType = {
    id: string
}

const Tasks = React.memo((props: propsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    let todolistFilter = useSelector<AppRootStateType, FilterValuesType>(state => state.todolists.filter(t => t.id === props.id)[0].filter)
    //Фильтрация tasks
    if (todolistFilter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolistFilter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return (
        <>
            {
                tasks.map(t => {
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Task key={t.id} taskId={t.id} todolistId={props.id} title={t.title} isDone={t.isDone}/>
                            </li>)
                    }
                )
            }
        </>
    )
})

export default Tasks;

