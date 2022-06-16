import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {Avatar, Button, Container, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";

import AddBoxIcon from '@mui/icons-material/AddBox';


import ProjectsCard from "../components/ProjectsCard";
import NavbarAdmin from "../components/NavbarAdmin";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: "100%",
            height: "100%",
        },
    };
});

const Projects = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const avatarStyle = {backgroundColor: '#1bbd7e'};
    const btnstyle = {margin: '8px 0', backgroundColor: '#1bbd7e', width: '50%', left: '25%'};
    const txtFields = {marginBottom: '7px'}


    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);


    const [locationOfTheProject, setLocationOfTheProject] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfResources, setNumberOfResources] = useState(0);
    const [addNewProject, setAddNewProject] = useState(false);

    useEffect(() => {
        axios.get("/api/admin/getProjects").then((res) => setProjects(res.data));

        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
    }, []);

    function handleAddNewProjectForm() {
        axios.post("/api/admin/addProject", {
            locatie: locationOfTheProject,
            nume: title,
            numarResurseNecesare: numberOfResources,
            descriere: description

        })
            .then(function (response) {
                console.log(response);
                setAddNewProject(false);
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocationOfTheProject(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleNumberOfResourcesChange = (e) => {
        setNumberOfResources(e.target.value);
    }


    return (
        <div>
            <NavbarAdmin></NavbarAdmin>
            <Container>
                <div className={classes.page}>

                    {addNewProject ? <div>
                            <div
                                style={{
                                    marginTop: '30px',

                                }}
                            >
                                <Grid>
                                    <Paper elevation={10} justify="center" className={classes.paperStyle}>
                                        <Grid align='center'
                                            style={{
                                                marginTop: '20px'
                                            }}
                                        >
                                            <Avatar style={avatarStyle}><AddBoxIcon/></Avatar>
                                            <h2>New project</h2>
                                        </Grid>
                                        <TextField label='Title' placeholder='Enter title of the project' fullWidth required
                                                   style={txtFields} autoComplete="off" onChange={handleTitleChange}
                                        />
                                        <TextField label='Location' placeholder='Enter location of the project' fullWidth
                                                   required
                                                   style={txtFields} autoComplete="off" onChange={handleLocationChange}
                                        />
                                        <TextField label='Description' placeholder='Short description about the project'
                                                   fullWidth
                                                   required rows={2} multiline style={txtFields}
                                                   onChange={handleDescriptionChange}
                                        />
                                        <TextField label='Number of resources'
                                                   placeholder='Enter a number of how many employees do you need for this project'
                                                   fullWidth required style={txtFields}
                                                   onChange={handleNumberOfResourcesChange}
                                        />
                                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth
                                                onClick={() => handleAddNewProjectForm()}>Add your new project !</Button>
                                    </Paper>
                                </Grid>
                            </div>
                        </div> :
                        <div>
                            <Button onClick={() => setAddNewProject(true)}> Add new project </Button>
                            <Grid container spacing={3}>
                                {projects?.map((project) => (
                                    <Grid item key={project.id} xs={12} md={6} lg={4}>
                                        <ProjectsCard project={project}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>}

                </div>
            </Container>
        </div>
    );
};
export default Projects;
