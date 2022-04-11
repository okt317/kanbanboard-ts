import {Button, createTheme, Grid, TextField, Typography} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {useStore} from "../../store/UseStore";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Board} from "../../entity/Board";

const theme = createTheme();
const useStyles = makeStyles(() => ({
    boardHeader: {
        padding: theme.spacing(2)
    },
    boardTitle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexGrow: '1',
    }
}));

type Props = {
    board:Board
}

export const BoardHeader = (props:Props) => {
    const {mobxStore} = useStore();
    const [updateOpen, setUpdateOpen] = useState(true)
    const [newTitle, setNewTitle] = useState(props.board.title)
    const classes = useStyles()
    const remove = () => {
        mobxStore.remove(props.board.id)
    }
    const updateTitle = () => {
        if (newTitle.trim().length > 0) {
            mobxStore.updateTitle(newTitle, props.board.id)
            setUpdateOpen(!updateOpen)
        } else {
            alert('최소 1자 이상')
        }
    }
    const updateCancel = () => {
        setNewTitle(props.board.title)
        setUpdateOpen(!updateOpen)
    }
    return (

        <Grid container className={classes.boardHeader}>
            {
                updateOpen ?
                    (
                        <Grid onClick={() => setUpdateOpen(!updateOpen)} className={classes.boardTitle}>
                            <Typography component='h5' variant='h5'>{props.board.title}</Typography>
                            <Button onClick={remove}>
                                <MoreVert/>
                            </Button>
                        </Grid>
                    )
                    :
                    (
                        <>
                            <TextField
                                value={newTitle}
                                type="text"
                                onChange={(e) => {
                                    setNewTitle(e.target.value)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        updateTitle();
                                    }
                                }}
                            />
                            <Grid>

                                <Button onClick={updateTitle}>ok</Button>
                                <Button color="error" onClick={updateCancel}>Cancel</Button>
                            </Grid>
                        </>
                    )
            }

        </Grid>
    )
}