import {Grid, Paper, createTheme} from "@mui/material";
import {observer, useObserver} from "mobx-react";
import {useStore} from "../../store/UseStore";
import {useEffect} from "react";
import axios from "axios";
import {BoardList} from "../Board/BoardList";
import {BoardFooter} from "../Board/BoardFooter";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@mui/styles"

const url = '/db.json'
const theme = createTheme();
const useStyles = makeStyles(() => ({
    root: {
        padding: theme.spacing(2),
        width: '300px',
        display: 'flex',
        flex: '1 1 auto',
        height: '100%'
    },
    wrapper: {
        width: "100%",
        // height: '100%',
        flex: '1 1 auto',
        margin: "0 auto",
        padding: theme.spacing(2),
        paddingTop: '24px',
        paddingBottom: '24px',
        display: "flex",
        minHeight: "calc(100vh - 5rem)",
        overflowY: "auto",
        overflowX: 'auto',
    }
}));

export const MainPage = observer(() => {
    const {mobxStore} = useStore()
    const classes = useStyles();

    useEffect(() => {
        console.log('TaskPage useEffect')
        const loading = async () => {
            try {
                const res = await axios.get(url)
                mobxStore.setBoards(res.data)
            } catch (error) {
                console.log('Error', error)
            }
        }
        loading().then()
    }, mobxStore.boards)

    const onDragEnd = (result:any) => {
        mobxStore.onDragEnd(result)
    }


    return useObserver(() =>
        (mobxStore.boards.length > 0 ?
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" type="list" direction="horizontal">
                        {(provided) => (
                            // <Grid container className={classes.root} spacing={3}>
                            <Grid
                                className={classes.wrapper}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {mobxStore.boards.map((board, index) => {
                                    return (
                                        <BoardList board={board} index={index} key={board.id}/>
                                    )
                                })}
                                <Grid>
                                    <Paper elevation={3}>
                                        <BoardFooter id='new'/>
                                    </Paper>
                                </Grid>
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
                :

                <Grid className={classes.wrapper}>
                    <Paper elevation={3} style={{height:'10%'}}>
                        <BoardFooter id='new'/>
                    </Paper>
                </Grid>

        ));
})