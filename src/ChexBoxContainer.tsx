import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {changeTaskStatusAC} from "./state/task-reducer";
import {useDispatch} from "react-redux";

type propsType={
    todolistId:string
    taskId:string
    isDone:boolean
}

const ChexBoxContainer = (props:propsType) => {
    const dispatch=useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.todolistId, props.taskId, newIsDoneValue))
    }
    return (
            <Checkbox onChange={onChangeHandler} checked={props.isDone}/>
    );
};

export default ChexBoxContainer;