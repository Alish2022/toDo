import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer
})

export type AppRootStateType=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer)

// @ts-ignore
window.store=store