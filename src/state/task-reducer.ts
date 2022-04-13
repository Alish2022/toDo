import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveActionType} from "./todolist-reducer";

type RemoveTaskType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}

type AddTaskType = {
    type: "ADD-TASK",
    todolistId: string,
    title: string
}

type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS",
    todolistId: string,
    taskId: string,
    isDone: boolean
}

type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string,
    taskId: string,
    title: string
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskType => {
    return {
        type: "REMOVE-TASK",
        todolistId: todolistId,
        taskId: taskId
    }
}

export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        title: title
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId: todolistId,
        taskId: taskId,
        title: title
    }
}

type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | RemoveActionType | AddTodolistActionType

export const todolistId1 = v1();
export const  todolistId2 = v1();
const initialState:TasksStateType={
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const taskReducer = (state: TasksStateType=initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let newTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {...state, [action.todolistId]: newTasks}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map
                    (t => t.id === action.taskId ?
                        {...t, isDone: action.isDone} :
                        t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map
                    (t => t.id === action.taskId ?
                        {...t, title: action.title} :
                        t)
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        case "ADD-TODOLIST": {
            let newState = {...state,[action.id]:[]}
            return newState
        }
        default:
            return state
    }
}