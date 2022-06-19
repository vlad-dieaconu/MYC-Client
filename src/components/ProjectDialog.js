import React, {useEffect} from 'react';
import {
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItem,
    ListItemText,
} from "@mui/material";
import axios from "axios";
import {Alert, Button, List} from "reactstrap";
import {ThemeProvider} from "@mui/styles";


const theme = createTheme({

        '@global': {
            '*::-webkit-scrollbar': {
                display: 'none'
            }
        }
    }
);


const ProjectDialog = ({dialog, proj}) => {

    const [dialogHere, setDialogHere] = React.useState(dialog);
    const [project, setProject] = React.useState([]);


    useEffect(() => {
        console.log(dialog)
        axios.get('/api/admin/getProject?id=' + proj)
            .then(res => {
                console.log(res.data);
                setProject(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleClose = () => {
        setDialogHere(false);
        window.location.reload();
    }

    console.log(project);

    const projectCommits = [];

    project.projectCommits?.map(commit => {
        projectCommits.push(commit);
    })

    const users = [];

    projectCommits?.map(commit => {
        users.push(commit.user);
    })

    // console.log(users);

    //make users to contain only unique users.nume and users.prenume
    const uniqueUsers = [];

    users.map(user => {
        if (!uniqueUsers.includes(user.nume + " " + user.prenume)) {
            uniqueUsers.push(user.nume + " " + user.prenume);
        }
    })

    // console.log(uniqueUsers);
    //
    // console.log(projectCommits);

    console.log(project)
    console.log(project.id)

    const handleDelete = () => {
        axios.delete("/api/admin/deleteProject?id=" + project.id)
        window.location.reload(false);
    }

    return (
        <ThemeProvider theme={theme}>
        <div>
            <Dialog open={dialogHere} onClose={handleClose}
                    fullScreen={true}>
                <DialogTitle
                    style={{
                        marginTop: '30px',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>

                    {project.nume}
                </DialogTitle>

                <DialogContent
                    style={{marginTop: '20px', marginLeft: '30px'}}>
                    <DialogContentText
                        style={{fontSize: '30px', fontWeight: 'bold', color: 'black'}}>

                        <h3
                            style={{
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                display: 'flex'
                            }}
                        >
                            Details about the project
                        </h3>

                        <div
                            style={{marginTop: '20px', fontWeight: 'bold'}}
                        >
                            <h4>Contributors</h4>
                            {
                                uniqueUsers.map(user => {
                                    return (
                                        <ListItem>
                                            <ListItemText>{user}</ListItemText>
                                        </ListItem>
                                    )
                                })
                            }
                        </div>

                    </DialogContentText>
                    <div
                        style={{marginTop: '20px', fontWeight: 'bold'}}>
                        Project commits:
                    </div>
                    <List

                        style={{marginTop: '20px', maxHeight: 350, overflow: 'auto', maxWidth: 700}}
                    >

                        {
                            project.projectCommits?.map(commit => {
                                return (
                                    <ListItem key={commit.id}>

                                        <ListItemText
                                            primary={commit.commit}
                                            secondary={"Commit by user " + commit.user.prenume + " " + commit.user.nume + "\n" + commit.date.split('T')[0]}

                                        >

                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>

                    <div
                        style={{
                            fontWeight: 'bold',
                            position: 'absolute',
                            top: '300px',
                            marginBottom: '30px',
                            right: '500px',
                            left: '1000px'}}>
                        Project description
                    </div>

                    <div
                    style={{
                        position: 'absolute',
                        marginTop: '30px',
                        top: '300px',
                        right: '500px',
                        left: '1000px'}}>
                        {project.descriere}
                    </div>

                </DialogContent>
                <DialogActions>

                    <Button onClick={handleDelete} style={{color: "red", background: "white"}}>Delete project</Button>

                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
        </ThemeProvider>
    )


}

export default ProjectDialog;