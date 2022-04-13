import React, {useCallback} from 'react';
import {Button} from "@mui/material";
import {changeFilterAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {FilterValuesType, TodolistType} from "./App";
import {AppRootStateType} from "./state/store";

type propsType={
    todolistId:string
}

const StatusButtons = React.memo((props:propsType) => {
    console.log('status button')
    let todolistFilter = useSelector<AppRootStateType,FilterValuesType>(state => state.todolists.filter(t => t.id === props.todolistId)[0].filter)
    const dispatch=useDispatch()

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"all")),[props.todolistId,dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"active")),[props.todolistId,dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"completed")),[props.todolistId,dispatch])

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button onClick={onAllClickHandler} variant={todolistFilter === 'all' ? "contained" : "outlined"}>All</Button>
            <Button onClick={onActiveClickHandler}
                    variant={todolistFilter === 'active' ? "contained" : "outlined"}>Active</Button>
            <Button onClick={onCompletedClickHandler}
                    variant={todolistFilter === 'completed' ? "contained" : "outlined"}>Completed</Button>
        </div>
    );
});

export default StatusButtons;