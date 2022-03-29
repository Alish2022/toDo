import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";

test('remove-todolist',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    const startState:Array<TodolistType>=[
        {id:todolistId1,title:"What learn",filter:'all'},
        {id:todolistId2,title:"Hello",filter:'all'}
    ]

    const endState=todolistReducer(startState,removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("What learn")
})

test('change-todolist-title',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    const startState:Array<TodolistType>=[
        {id:todolistId1,title:"What learn",filter:'all'},
        {id:todolistId2,title:"Hello",filter:'all'}
    ]

    const newTitle="Yo"

    const endState=todolistReducer(startState,changeTodolistTitleAC(todolistId1,newTitle))

    expect(endState[0].title).toBe("Yo")
    expect(endState[1].title).toBe("Hello")
})

test('add-todolist',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    const startState:Array<TodolistType>=[
        {id:todolistId1,title:"What learn",filter:'all'},
        {id:todolistId2,title:"Hello",filter:'all'}
    ]

    const newTitle="Yo"

    const endState=todolistReducer(startState,addTodolistAC(newTitle))

    expect(endState[2].title).toBe("Yo")
    expect(endState[1].title).toBe("Hello")
    expect(endState[0].title).toBe("What learn")
    expect(endState.length).toBe(3)
})

test('change-filter',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    const startState:Array<TodolistType>=[
        {id:todolistId1,title:"What learn",filter:'all'},
        {id:todolistId2,title:"Hello",filter:'all'}
    ]

    const newFilter="active"

    const endState=todolistReducer(startState,changeFilterAC(todolistId2,newFilter))

    expect(endState[1].filter).toBe("active")
    expect(endState[0].filter).toBe("all")
    expect(endState.length).toBe(2)
})