import {createTheme, Divider, Grid, Paper, Typography} from "@mui/material";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {BoardFooter} from "./BoardFooter";
import {BoardHeader} from "./BoardHeader";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Board} from "../../entity/Board";
import {TaskList} from "../Task/TaskList";


const theme = createTheme();
const useStyles = makeStyles(() => ({
    boardCard: {
        width: '300px',
        display: 'flex',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden',
        // marginLeft: '8px',
        marginRight: '8px',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        }
    },
    divider: {
        marginTop: theme.spacing(2)
    },
    listTasks: {
        width: "300px",
        backgroundColor: "#ebecf0",
        marginRight: "0.5rem",
        borderRadius: " 5px",
    },
    listContainer: {
        overflowX: 'auto',
        overflowY: "hidden",
        margin: '0.5rem 0'
    }
}))

type Props = {
    board : Board
    index: number
}



export const BoardList = (props:Props) => {
    const [boardList, setBoardList] = useState(props.board);
    const classes = useStyles();

    return (

        <Draggable draggableId={props.board.title+ "/" + props.board.id} index={props.index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <div className={classes.listTasks} {...provided.dragHandleProps}>
                        <Paper key={props.board.id} elevation={3} className={classes.boardCard}>
                            <BoardHeader board={props.board}/>
                            <Divider/>
                            <Droppable droppableId={props.board.title + "/" + props.board.id} type="task">
                                {(provided) => (
                                    <Grid
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={classes.listContainer}
                                    >
                                        {
                                            props.board.tasks.length > 0 ?
                                                <TaskList tasks={props.board.tasks} boardId={props.board.id}/>
                                                :
                                                <Typography variant='h6' style={{paddingLeft:"10px"}}>
                                                    Nothing in the List
                                                </Typography>
                                        }
                                        {provided.placeholder}
                                    </Grid>
                                )}
                            </Droppable>
                            <Divider className={classes.divider}/>
                            <BoardFooter id={props.board.id}/>
                        </Paper>

                    </div>
                </div>
            )}
        </Draggable>
    )
}