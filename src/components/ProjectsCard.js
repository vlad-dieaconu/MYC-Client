import React, {useState} from "react";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    TextField, CardActionArea
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { createContext, useContext } from "react";

import ProjectDialog from "./ProjectDialog";


const ProjectsCard = ({project}) => {

    const context = createContext();

    const [editable, setEditable] = useState(true);
    const [projectId, setProjectId] = useState(project.id);
    const [descriere, setDescriere] = useState("");
    const [showModal, setShowModal] = useState(false);


    const handleSave = () => {
        axios.put("/api/admin/editProject?id=" + projectId, {
            descriere: descriere
        }).then(res => console.log(res.data))

        setEditable(true);
        window.location.reload(false);

    }

    const handleDescriptionChange = (e) => {
        setDescriere(e.target.value);
    }

    const handleDelete = () => {
        axios.delete("/api/admin/deleteProject?id=" + projectId)
        setEditable(true);
        window.location.reload(false);
    }


    const handleShowModal = () => {
        console.log("project id: " + projectId);
        setShowModal(true);
    }

    return (
        <div>

            <Card
                elevation={10}
            >
                <CardActionArea onClick={handleShowModal}>
                    <CardHeader
                        action={
                            <IconButton onClick={() => setEditable(false)}>
                                {editable ? <EditIcon/> : <></>}
                            </IconButton>
                        }
                        title={project.nume}
                        subheader={project.locatie}
                    />
                    <CardContent>
                        <p>Numar resurse necesare: {project.numarResurseNecesare}</p>
                        <p>Numar resurse actuale: {project.numarActualResurse}</p>
                        {editable ? project.descriere :
                            <div>
                                <div>
                                    <TextField label="New description" onChange={handleDescriptionChange}>

                                    </TextField>
                                </div>
                                <div>
                                    <IconButton onClick={handleSave}>
                                        <SaveIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleDelete}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
            <div>
                {showModal ?  <div><ProjectDialog dialog={showModal} proj={projectId}/></div> : <></>}
            </div>

        </div>
    );
};
export default ProjectsCard;
