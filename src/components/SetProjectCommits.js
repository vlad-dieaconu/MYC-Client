import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";

const SetProjectCommits = () => {

    const [commit, setCommit] = useState("");

    const handleSubmit = () => {

        axios.post("/api/user/setProjectCommit",
            {
                commit: commit
            }
            )
            .then((r) => {
                console.log(r.data);
            })


    }

    const handleChangeDetails = (e) => {
        setCommit(e.target.value);
    }

    return (
        <div style={{
            marginLeft: '130px',
            marginTop: '10px',
        }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <TextField onChange={handleChangeDetails}
                           label="Commit"
                           variant="outlined"
                           color="secondary"
                           multiline
                           rows={2}
                           fullWidth
                           required
                    // error={detailsError}
                />

                <Button
                    style={{marginTop: '10px'}}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}>
                    Submit
                </Button>
            </form>
        </div>
    );

}

export default SetProjectCommits;