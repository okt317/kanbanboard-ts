import {Task} from "./Task";

export interface Board {
    id:number,
    title:string,
    tasks: Task[]
}