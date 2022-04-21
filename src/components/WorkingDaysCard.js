import {Card, CardContent, CardHeader} from "@mui/material";
import React, {useEffect, useState} from "react";


const WorkingDaysCard = (personalWorkingDay, selected) => {

    console.log(personalWorkingDay);

    return (
        <div>
            {selected ?             <Card sx={{maxWidth: 500}}>
                <CardHeader
                    title={personalWorkingDay.personalWorkingDay.id + ". " + "Work details"}
                    subheader={"On date: "+ personalWorkingDay.personalWorkingDay.date.split("T")[0]}
                />
                <CardContent>
                    {personalWorkingDay.personalWorkingDay.details}
                </CardContent>
            </Card>: <></> }




        </div>
    )
}

export default WorkingDaysCard;




