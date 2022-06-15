import React, {useState} from 'react';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import clsx from 'clsx';
import axios from "axios";


const LeaveRequestTable = ({leaveRequest}) => {

    const columns = [

        {
            field: 'fullName',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 150,
        },
        {
            field: 'endDate',
            headerName: 'End date',
            width: 150,
        },
        {
            field: 'durations',
            headerName: 'Durations',
            width: 150,
        },
        {
            field: 'leaveType',
            headerName: 'Leave Type',
            width: 200,
        },
        {
            field: 'seenBySupervisor',
            headerName: 'Seen',
            width: 160,
            cellClassName: (params) => {
                if (params.value == null) {
                    return '';
                }

                return clsx('super-app', {
                    negative: params.value === 'Yes',
                    positive: params.value === 'No',
                });
            },
        },
        {
            field: 'seenBySupervisor',
            headerName: 'Seen',
            width: 160,
        },
        {
            field: 'approved',
            headerName: 'Approved',
            width: 160,

        },


    ];


    const [selectedRows, setSelectedRows] = useState([]);
    const [rowSelected, setRowSelected] = useState(false);
    const rows = [];


    leaveRequest.map((e) => {
        let row = {};
        row.id = e.id;
        row.fullName = e.user.nume + " " + e.user.prenume;
        row.startDate = e.startDate.split("T")[0];
        row.endDate = e.endDate.split("T")[0];
        row.leaveType = e.leaveType;
        row.durations = e.numberOfDays;
        row.approved = e.approved ? "Yes" : "No";
        row.seenBySupervisor = e.seenBySuperior ? "Yes" : "No";
        rows.push(row);
    })



    const handleAccept = () => {
        axios.put('/api/admin/acceptLeaveRequest/?id=' + selectedRows[0].id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleReject = () => {
        axios.put('api/admin/declineLeaveRequest/?id=' + selectedRows[0].id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div style={{height: 700, width: '100%'}}>
            <Box
                sx={{
                    height: 700,
                    width: 1,
                    '& .super-app.negative': {
                        backgroundColor: 'green',
                        color: 'black',
                        fontWeight: '600',
                    },
                    '& .super-app.positive': {
                        backgroundColor: 'red',
                        color: 'black',
                        fontWeight: '600',
                    },
                }}
            >

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
                {...leaveRequest}
                components={{Toolbar: GridToolbar}}
                // disableSelectionOnClick
            />
            </Box>
            <div>
                {rowSelected ?
                    <div>
                     <Button onClick={handleAccept}>
                         Accept
                     </Button>
                     <Button onClick={handleReject}>
                         Reject
                     </Button>
                    </div>
                    :
                    <>

                    </>
                }

            </div>
        </div>
    )

}
export default LeaveRequestTable;

