import React, {useEffect, useState} from "react";
import NavbarEmployee from "../components/NavbarEmployee";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Paper
} from "@mui/material";
import SetProjectCommits from "../components/SetProjectCommits";


const ProjectEmployee = () => {


    const [loggUser, setUser] = useState();

    const [project, setProject] = useState({});
    const [projectCommits, setProjectCommits] = useState([]);


    const [dataIsSet, setData] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        axios.get("/api/user/getProject").then(
            (res) => {
                console.log(res.data)
                setProject(res.data);
                setData(true)
            }
        ).catch(
            (error) => {
                console.log('response: ', error.response.data.message)
            }
        )

        axios.get("/api/user/getProjectCommits").then(
            (res) => {
                console.log(res.data)
                setProjectCommits(res.data);
                setData(true)
            }
        ).catch(
            (error) => {
                console.log('response: ', error.response.data.message)
            }
        )

        const loggedInUser = localStorage.getItem("USER");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }
    }, []);


    return (
        <div>
            {dataIsSet ?
                <div>
                    <NavbarEmployee/>
                    <Container>
                        < Grid width={450} marginBottom={"30px"}>
                            <Card elevation={10}>
                                <CardHeader title={project.nume}
                                            subheader={project.locatie}>
                                </CardHeader>
                                <CardContent>
                                    {project.descriere}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Paper style={{maxHeight: 350, overflow: 'auto'}}>
                            <List>
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Project Commits
                                </ListSubheader>
                                {projectCommits.map((commit) => (
                                    <ListItem key={commit.id}>
                                        <ListItemText primary={commit.commit}
                                                      secondary={"Date: " + commit.date.split("T")[0]}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                        <SetProjectCommits/>
                    </Container>
                </div> : <></>
            }


        </div>
    )
        ;

}
export default ProjectEmployee