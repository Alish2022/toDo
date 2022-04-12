import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";

let todolistId1:string
let todolistId2:string
let startState:Array<TodolistType>

beforeEach(()=>{
    todolistId1=v1()
    todolistId2=v1()

    startState=[
        {id:todolistId1,title:"What learn",filter:'all'},
        {id:todolistId2,title:"Hello",filter:'all'}
    ]
})


test('remove-todolist',()=>{
    const endState=todolistReducer(startState,removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("What learn")
})

test('change-todolist-title',()=>{
    const newTitle="Yo"

    const endState=todolistReducer(startState,changeTodolistTitleAC(todolistId1,newTitle))

    expect(endState[0].title).toBe("Yo")
    expect(endState[1].title).toBe("Hello")
})

test('add-todolist',()=>{
    const newTitle="Yo"
    const endState=todolistReducer(startState,addTodolistAC(newTitle))

    expect(endState[0].title).toBe("Yo")
    expect(endState[2].title).toBe("Hello")
    expect(endState[1].title).toBe("What learn")
    expect(endState.length).toBe(3)
})

test('change-filter',()=>{
    const newFilter="active"
    const endState=todolistReducer(startState,changeFilterAC(todolistId2,newFilter))

    expect(endState[1].filter).toBe("active")
    expect(endState[0].filter).toBe("all")
    expect(endState.length).toBe(2)
})