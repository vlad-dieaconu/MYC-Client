import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProjectsCard = ({ project }) => {
  return (
    <div>
      {/*TODO Add a function that will render another page with every detail about a specific project.*/}
      <Card
        elevation={10}
        onClick={() => console.log("Card with id", project.id)}
      >
        <CardHeader
          action={
            //TODO: ADD a function in Projects page and pass it in here as a props. function that will let Admin to edit the card
            <IconButton onClick={() => console.log("click", project.id)}>
              <EditIcon />
            </IconButton>
          }
          title={project.nume}
          subheader={project.locatie}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {project.descriere}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProjectsCard;
