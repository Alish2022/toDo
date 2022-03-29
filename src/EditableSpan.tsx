import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    let [error,setError]=useState(false)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        if(!error){
            setEditMode(false);
            props.onChange(title.trim());
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.trim()===""){
            setError(true)
        } else{
            setError(false)
        }
        setTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    return editMode
        ?
        <>
            <TextField size={"small"}
                       value={title}
                       onChange={changeTitle}
                       autoFocus
                       onBlur={activateViewMode}
                       variant="outlined"
                       error={error}
                       helperText={error && "Field is requered"}
                       onKeyPress={onKeyPressHandler}
            />
            {/*<input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>*/}
        </>

        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
