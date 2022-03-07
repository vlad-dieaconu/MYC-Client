import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@mui/material";
import axios from "axios";

import ProjectsCard from "../components/ProjectsCard";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(3),
    },
  };
});

const Projects = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [locationOfTheProject, setLocationOfTheProject] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfResources, setNumberOfResources] = useState(0);

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

  return (
    <div>
      <Container>
        <div className={classes.page}>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item key={project.id} xs={12} md={6} lg={4}>
                <ProjectsCard project={project} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};
export default Projects;
