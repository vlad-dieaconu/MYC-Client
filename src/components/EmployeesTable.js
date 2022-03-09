import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

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
            width: 150,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
        },

        {
            field: 'cnp',
            headerName: 'CNP',
            width: 110,
            //editable: true
        },

    ];

    const rows = [];

    employee.map((e) => {
        let row = {};
        row.id = e.id;
        row.nume = e.nume;
        row.prenume = e.prenume;
        row.cnp = e.cnp;
        row.email = e.email;
        row.username = e.username;
        rows.push(row);
    })

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );

}

export default EmployeesTable;