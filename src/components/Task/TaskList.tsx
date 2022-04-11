import {Draggable} from "react-beautiful-dnd";
import {Grid} from "@mui/material";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Task} from "../../entity/Task";
import {TaskInfo} from "./TaskInfo";

const useStyles = makeStyles(() => ({
    boardContent: {
        // height: '100%'
    }
}))

type Props = {
    tasks:Task[],
    boardId:number
}

export const TaskList:any = ({tasks, boardId}:Props) => {
    const classes = useStyles();
    const [taskList, setTaskList] = useState(tasks);
    return (
        taskList.map((task, index) => (
                <Draggable draggableId={task.title+'/'+task.id} index={index} key={task.id}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                        >
                            <Grid className={classes.boardContent}  item xs={12}>
                                <TaskInfo task={task} boardId={boardId} index={index}/>
                            </Grid>
                        </div>
                    )}
                </Draggable>
            )
        )
    )
}