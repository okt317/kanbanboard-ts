import {CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Add} from "@mui/icons-material";
import {AddCard} from "../AddCard/AddCard";

const useStyles = makeStyles(() => ({
    boardButton: {
        width: "300px",
        justifyContent: 'center'
    }
}))

type Props = {
    id:string | number
}

export const BoardFooter = (props:Props) => {
    const classes = useStyles();
    const [showInput, setShowInput] = useState(false)

    const openAddCard = () => {
        setShowInput(true)
    }
    const closeInput = () => {
        setShowInput(false)
    }

    return (
        <Grid className={classes.boardButton}>
            {showInput ?
                <AddCard handleClose={closeInput} boardId={props.id}/>
                :
                <CardActionArea>
                    <CardContent onClick={openAddCard}>
                        <Typography component='span' variant='h6' style={{paddingLeft: '45%'}}>
                            <Add/>
                        </Typography>
                    </CardContent>
                </CardActionArea>}
        </Grid>
    )

}
