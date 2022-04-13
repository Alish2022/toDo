import React, {useCallback} from 'react';
import {Button} from "@mui/material";
import {changeFilterAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TodolistType} from "./App";
import {AppRootStateType} from "./state/store";

type propsType={
    todolistId:string
    filter:string
}

const StatusButtons = React.memo((props:propsType) => {
    console.log('status button')
    const dispatch=useDispatch()
    let todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(t => t.id === props.todolistId)[0])

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"all")),[props.todolistId,dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"active")),[props.todolistId,dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC( props.todolistId,"completed")),[props.todolistId,dispatch])

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? "contained" : "outlined"}>All</Button>
            <Button onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? "contained" : "outlined"}>Active</Button>
            <Button onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed</Button>
        </div>
    );
});

export default StatusButtons;