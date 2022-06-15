import React, {useState} from "react"
import {Accordion} from "react-bootstrap";

const WorkingDaysAccordion = ({workingDay}) => {

    return(
        <Accordion defaultActiveKey={workingDay.id}>
            <Accordion.Item eventKey={workingDay.id}>
                <Accordion.Header>Working day by {workingDay.user.nume + " " +workingDay.user.prenume} on {workingDay.date.split("T")[0]}</Accordion.Header>
                <Accordion.Body>
                    {workingDay.details}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
export default WorkingDaysAccordion;