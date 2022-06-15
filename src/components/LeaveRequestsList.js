import React from 'react'
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

const LeaveRequestsList = ({leaveRequest}) => {

    console.log(leaveRequest);

    const [approved, setApproved] = React.useState(leaveRequest.approved);
    const [seenBySuperior, setSeenBySuperior] = React.useState(leaveRequest.seenBySuperior);

    //difference between startDate and endDate
    const diff = (new Date(leaveRequest.endDate) - new Date(leaveRequest.startDate)) / (1000 * 60 * 60 * 24);

    console.log(leaveRequest)

    return (



        <div>
            {seenBySuperior ?
                <List
                    style={{marginTop: '5px', maxHeight: 150, overflow: 'auto', maxWidth: 700}}
                >
                    <ListItem key={leaveRequest.id}>
                        <ListItemIcon>
                            {approved ? <CheckBoxIcon style={{color: 'green'}}/> : <DoDisturbIcon style={{color: 'red'}}/>}
                        </ListItemIcon>
                        <ListItemText
                            primary={leaveRequest.leaveType}
                            secondary={leaveRequest.startDate.split('T')[0] + " - " + leaveRequest.endDate.split('T')[0] + " (" + diff + " days)"}
                        />

                    </ListItem>
                </List> :
                <>

                </>
            }
        </div>
    )

}
export default LeaveRequestsList;