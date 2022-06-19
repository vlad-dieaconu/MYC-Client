import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {Avatar, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";

import AddBoxIcon from '@mui/icons-material/AddBox';


import ProjectsCard from "../components/ProjectsCard";
import NavbarAdmin from "../components/NavbarAdmin";
import {makeStyles} from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
    const [projectsForFilter, setProjectsForFilter] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/getProjects").then((res) => {
            setProjects(res.data)
            setProjectsForFilter(res.data)
        });


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


    const handleChangeSelect = (event) => {
        // console.log(event.target.value)
        axios.get("/api/admin/getProjectsByLocation?location=" + event.target.value).then(
            (res) => {
                // console.log(res)
                setProjects(res.data);
            }
        )
    }

    //remove projects from the projectsForFilter if the location of the project is duplicated
    const removeDuplicates = (arr) => {
        let unique_array = []
        for (let i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i].locatie) === -1) {
                unique_array.push(arr[i].locatie)
            }
        }
        // console.log(unique_array)
        return unique_array
    }
    // removeDuplicates(projectsForFilter)

    const handleChaangeCheckBox = (event) => {
        console.log(event.target.checked)
        if (event.target.checked) {
            axios.get("/api/admin/getProjectWithMostRessourcesNeeded").then(
                (res) => {
                    console.log(res.data)
                    setProjects(res.data);
                });
        } else if (event.target.checked === false) {
            axios.get("/api/admin/getProjects").then(
                (res) => {
                    console.log(res.data)
                    setProjects(res.data);
                });
        }
    }

    const handleChaangeCheckBox2 = (event) => {
        if (event.target.checked) {
            axios.get("/api/admin/getProjectWithMostActualResources").then(
                (res) => {
                    console.log(res.data)
                    setProjects(res.data);
                });
        } else if (event.target.checked === false) {
            axios.get("/api/admin/getProjects").then(
                (res) => {
                    console.log(res.data)
                    setProjects(res.data);
                });
        }
    }

    // console.log(projects)
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
                                        <TextField label='Title' placeholder='Enter title of the project' fullWidth
                                                   required
                                                   style={txtFields} autoComplete="off" onChange={handleTitleChange}
                                        />
                                        <TextField label='Location' placeholder='Enter location of the project'
                                                   fullWidth
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
                                        <Button type='submit' color='primary' variant="contained" style={btnstyle}
                                                fullWidth
                                                onClick={() => handleAddNewProjectForm()}>Add your new project
                                            !</Button>
                                    </Paper>
                                </Grid>
                            </div>
                        </div> :
                        <div>
                            <div style={{
                                marginTop: '20px'
                            }}>
                                <h4>Search by location</h4>
                                <FormControl style={{marginTop: "10px", width: '10%'}}>
                                    <InputLabel id="demo-simple-select-label">Locations</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={locationOfTheProject}
                                        label="Locations"
                                        onChange={handleChangeSelect}
                                    >
                                        {removeDuplicates(projectsForFilter).map((empl) => {
                                            return (
                                                <MenuItem value={empl}>{empl}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                                <FormGroup>
                                    <FormControlLabel
                                        style={{fontWeight: 'bold'}}
                                        control={<Checkbox/>}
                                        onChange={handleChaangeCheckBox}
                                        label="Get the project with the most resources needed"/>
                                    <FormControlLabel
                                        style={{fontWeight: 'bold'}}
                                        control={<Checkbox/>}
                                        onChange={handleChaangeCheckBox2}
                                        label="Get the project with the most actual resources"/>
                                </FormGroup>

                            </div>
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
