import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../App";
import {removeTodolistAC, todolistReducer} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";

let todolistId1:string
let todolistId2:string
let tasks:TasksStateType

beforeEach(()=>{
    todolistId1=v1()
    todolistId2=v1()

    tasks={
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    };
})


test('remove-todolist',()=>{

    const endState=taskReducer(tasks,removeTaskAC(todolistId2,tasks[todolistId2][0].id))

    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe("React Book")
    expect(endState[todolistId1][1].title).toBe("JS")
})

test('add-task',()=>{
    let newTaskTitle="story"

    const endState=taskReducer(tasks,addTaskAC(todolistId2,newTaskTitle))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe("story")
    expect(endState[todolistId1][1].title).toBe("JS")
})

test('change-task-status',()=>{

    const endState=taskReducer(tasks,changeTaskStatusAC(todolistId1,tasks[todolistId1][1].id,false))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][1].isDone).toBe(true)
    expect(endState[todolistId1][1].isDone).toBe(false)
})

test('change-task-title',()=>{
    let newTitle="Redux"

    const endState=taskReducer(tasks,changeTaskTitleAC(todolistId1,tasks[todolistId1][1].id,newTitle))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][1].title).toBe("React Book")
    expect(endState[todolistId1][1].title).toBe("Redux")
})

test('remove-todolist-task',()=>{
    const endState=taskReducer(tasks,removeTodolistAC(todolistId2))
    let keyArray=Object.keys(endState)

    expect(keyArray.length).toBe(1)
    expect(endState[todolistId2]).toBeUndefined()
})