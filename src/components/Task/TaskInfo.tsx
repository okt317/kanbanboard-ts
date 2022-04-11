import {Button, Card, CardContent, createTheme, Grid, TextField, Theme, Typography} from "@mui/material";
import {useStore} from "../../store/UseStore";
import {useState} from "react";
import {DeleteOutline} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {Task} from "../../entity/Task";

const theme = createTheme();
const useStyles = makeStyles(() => ({
    root: {
        margin: theme.spacing(2),
        marginBottom: 20,
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingBottom: theme.spacing(2)
    },
    bottomBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    }
}));

type Props = {
    task:Task,
    boardId:number,
    index:number
}

export const TaskInfo = (props:Props) => {
    const {mobxStore} = useStore();
    const [newDate, setNewDate] = useState(props.task.start)
    const classes = useStyles()

    const remove = () => {
        mobxStore.remove(props.boardId, props.index)
    }
    const updateDate = (event:any) => {
        setNewDate(event.target.value)
        mobxStore.updateDate(newDate, props.boardId)
    }

    return (
        <Card
            className={classes.root}
            variant="outlined"
        >
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Grid>
                        <Typography component="h5" variant="h6">
                            {props.task.title}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} className={classes.bottomBox}>
                        {/*<Typography variant='body2'>{task.start}</Typography>*/}
                        <TextField type='date'
                                   value={newDate}
                                   onChange={updateDate}
                        />
                        <Button onClick={remove}>
                            <DeleteOutline/>
                        </Button>
                    </Grid>
                </CardContent>
            </div>
        </Card>
    )
}