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


    return (
        <div>
            {seenBySuperior ?
                <List>
                    <ListItem key={leaveRequest.id}>
                        <ListItemIcon>
                            {approved ? <CheckBoxIcon/> : <DoDisturbIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={leaveRequest.leaveType}
                                      secondary={" "+diff + " days duration"}/>
                    </ListItem>
                </List> :
                <>

                </>
            }
        </div>
    )

}
export default LeaveRequestsList;