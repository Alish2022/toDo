import {v1} from "uuid";
import {TasksStateType} from "../App";
import {taskReducer} from "./task-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

test('add-todolist-task',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    let tasks:TasksStateType={
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    };
    let newTitle="newTitle"

    const endState=taskReducer(tasks,addTodolistAC(newTitle))
    let keyArray=Object.keys(endState)
    let newId=keyArray[2]

    expect(keyArray.length).toBe(3)
    expect(endState[newId].length).toBe(0)
})