import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {Alert, Avatar, Button, Dialog, Grid, Paper, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'
import axios from "axios";
import RegisterEmployeeDialog from "./RegisterEmployeeDialog";


const EmployeesTable = ({employee}) => {


    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'prenume',
            headerName: 'First name',
            width: 150,
        },
        {
            field: 'nume',
            headerName: 'Last name',
            width: 150,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.prenume || ''} ${params.row.nume || ''}`,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
        },

        {
            field: 'cnp',
            headerName: 'CNP',
            width: 160,
            //editable: true
        },

    ];


    const [deleteUser, setDeleteUser] = useState(false);

    const [selectedRows, setSelectedRows] = useState([]);
    const [rowSelected, setRowSelected] = useState(false);

    //DIALOG
    const [dialog, setDialog] = useState(false);


    const rows = [];

    const [projects, setProjects] = useState([])
    const [projectId, setProjectId] = React.useState('');
    const [projectSelected, setProjectSelected] = useState(false);


    useEffect(() => {
        axios.get("/api/admin/getProjects").then((res) => {
            setProjects(res.data)
        });
        console.log(projects)
    }, []);


    //start a map on employee array avoiding first element
    employee.map((employee, index) => {
        let row = {};
        if (index !== 0) {
            row.id = employee.id;
            row.nume = employee.nume;
            row.prenume = employee.prenume;
            row.cnp = employee.cnp;
            row.email = employee.email;
            row.username = employee.username;
            rows.push(row);
        }
    });


    const handleChangeSelect = (event) => {
        setProjectId(event.target.value);
        setProjectSelected(true);
    };


    const handleSubmitAddNewEmployee = () => {
        axios.put("/api/admin/addUserToProject?idUser=" + selectedRows[0].id + "&idProject=" + projectId).then((res) => console.log(res.data));
        setRowSelected(false);
    }

    const handleDeleteUser = () => {
        axios.delete("/api/admin/removeEmployee?id=" + selectedRows[0].id);
        window.location.reload();
    }


    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                onSelectionModelChange={(ids) => {
                    setRowSelected(true);
                    const selectedIDs = new Set(ids);
                    const selectedRows = rows.filter((row) =>
                        selectedIDs.has(row.id),
                    );
                    setSelectedRows(selectedRows);
                }}
                {...employee}

            />

            

            <div>
                <Button onClick={() => setDialog(true)}>Create a new employee account</Button>
            </div>
            <div>
                {rowSelected ?

                    <div>
                        <div>
                            <Button onClick={handleDeleteUser}>
                                Remove this user.
                            </Button>
                        </div>
                        <h2>Add this employee to a specific project</h2>
                        <h4>Select the project</h4>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={projectId}
                                    label="Project"
                                    onChange={handleChangeSelect}
                                >
                                    {projects.map((project) => {
                                        return (
                                            <MenuItem value={project.id}>{project.nume}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {projectSelected ? <Button onClick={handleSubmitAddNewEmployee}>Add new resource for this
                                project</Button> : <></>}
                        </div>

                    </div>
                    :
                    <></>

                }
                <div>
                    {dialog ? <RegisterEmployeeDialog dialog={dialog}/> : <></>}
                </div>
            </div>
        </div>

    );


}

export default EmployeesTable;
