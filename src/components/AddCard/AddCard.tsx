import React, {useState} from "react";
import {Button, IconButton, InputAdornment, TextField, Grid} from "@mui/material";
import {Close} from '@mui/icons-material'
import {useStore} from "../../store/UseStore";

type Props = {
    handleClose(open:boolean):void,
    boardId:number | string
}

export const AddCard = (props:Props) => {
    const {mobxStore} = useStore();
    const [text, setText] = useState('');
    const addList = () => {
        if (text.trim().length > 0) {
            mobxStore.addList(text)
            props.handleClose(false)
        }else {
            alert('최소 1자 이상')
        }
    }
    const addTask = () => {
        if (typeof props.boardId === 'number')
        if (text.trim().length > 0) {
            mobxStore.addTask(props.boardId, text)
            props.handleClose(false)
        }else {
            alert('최소 1자 이상')
        }
    }
    return (
        <Grid>
            <TextField
                label='New title'
                variant='outlined'
                fullWidth
                onChange={(event) => setText(event.target.value)}
                // onBlur={() => handleClose(false)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => props.handleClose(false)}>
                                <Close/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button color="primary" onClick={props.boardId === 'new' ? addList : addTask}>Add</Button>
            <Button color="error" onClick={() => props.handleClose(false)}>Cancel</Button>
        </Grid>
    )
}
