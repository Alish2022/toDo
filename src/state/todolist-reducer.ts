import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./task-reducer";

export type RemoveActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

export type AddTodolistActionType={
    type: "ADD-TODOLIST",
    title: string,
    id:string
}

type ChangeFilterActionType={
    type: "CHANGE-FILTER",
    id:string,
    filter: FilterValuesType
}

export const removeTodolistAC = (todolistId: string): RemoveActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId
    }
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId,
        title: title
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        id:v1()
    }
}

export const changeFilterAC = (todolistId:string,filter: FilterValuesType): ChangeFilterActionType => {
    return {
        type: "CHANGE-FILTER",
        id:todolistId,
        filter: filter
    }
}

type ActionType = RemoveActionType | ChangeTodolistTitleActionType|AddTodolistActionType|ChangeFilterActionType

const initialState:Array<TodolistType>=[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistReducer = (state: Array<TodolistType>=initialState, action: ActionType):Array<TodolistType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case "ADD-TODOLIST":{
            return [{id:action.id, title:action.title, filter:"all"},...state]
        }
        case "CHANGE-FILTER":{
            return state.map(t=>t.id===action.id?{...t,filter:action.filter}:t)
        }
        default:{
            return state
        }
    }
}