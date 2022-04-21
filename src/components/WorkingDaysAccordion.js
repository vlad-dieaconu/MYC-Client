import React, {useState} from "react"
import {Accordion} from "react-bootstrap";

const WorkingDaysAccordion = ({workingDay}) => {





    return(
        <Accordion defaultActiveKey={workingDay.id}>
            <Accordion.Item eventKey={workingDay.id}>
                <Accordion.Header>Working day for user with id + {workingDay.user_id} on {workingDay.date}</Accordion.Header>
                <Accordion.Body>
                    {workingDay.details}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )


}
export default WorkingDaysAccordion;