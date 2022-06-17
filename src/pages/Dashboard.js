import React, {useState, useEffect, PureComponent} from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import AuthService from "../services/AuthService";
import NavbarAdmin from "../components/NavbarAdmin";
import {useLocation, useNavigate} from "react-router-dom";
import NavbarEmployee from "../components/NavbarEmployee";
import axios from "axios";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

import './Dash.css';



const Dashboard = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [basicUser, setBasicUser] = useState(false);

    const [role, setRole] = useState(() => {
        if (AuthService.getCurrentUser()) {
            const currentUser = AuthService.getCurrentUser();
            const roleFromLocalStorage = currentUser.roles[0];
            return roleFromLocalStorage;
        }
        return "";
    });


    const [notifications, setNotifications] = useState([]);
    const [mostPopularProject, setMostPopularProject] = useState([]);

    const [projectCommits, setProjectCommits] = useState([]);


    useEffect(() => {

        axios.get('/api/admin/getTheMostPopularProject')
            .then(res => {
                setMostPopularProject(res.data);
                setProjectCommits(res.data.projectCommits)
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('/api/admin/getAllNotifications')
            .then(res => {
                setNotifications(res.data);
            })
            .catch(err => {
                console.log(err);
            });


        const loggedInUser = localStorage.getItem("USER");
        if (state.role == "ROLE_ADMIN") {
            setAdmin(true);
        }
        if (state.role == "ROLE_USER") {
            setBasicUser(true);
        }
        console.log(role)
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate("/home");
        }

    }, []);


    const deleteNotification = (notificationId) => {
        axios.delete('/api/admin/deleteNotification/?id=' + notificationId)
            .then(res => {
                console.log(res.data);
                setNotifications(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }


    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const statistics = []
    projectCommits.map((commit) => {
        statistics.push({
            name: commit.user.nume,
        })
    })

    //count the number of appearances of each name in statistics array
    const count = (statistics, name) => {
        let count = 0;
        for (let i = 0; i < statistics.length; i++) {
            if (statistics[i].name === name) {
                count++;
            }
        }
        return count;
    }

    //create a set with the names of the users and the number of times they appear in statistics array
    const names = [];
    for (let i = 0; i < statistics.length; i++) {
        names.push({
            name: statistics[i].name,
            value: count(statistics, statistics[i].name)
        })
    }

    //create an array with the rows from names array but take only unique names and values
    const uniqueNames = [];
    for (let i = 0; i < names.length; i++) {
        if (uniqueNames.findIndex(x => x.name === names[i].name) === -1) {
            uniqueNames.push({
                name: names[i].name,
                value: names[i].value
            })
        }
    }





    return (

        <div>
            {
                admin ? <div>
                    <NavbarAdmin/>
                    <div className="left-side">
                        <h1>Notifications</h1>
                        <List
                            style={{marginTop: '20px', maxHeight: 350, overflow: 'auto', maxWidth: 600}}

                        >
                            {
                             notifications.length > 0 ? notifications?.map(notification => {
                                    return (
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={() => deleteNotification(notification.id)}
                                            >
                                                <ListItemText primary={notification.description}
                                                              secondary={notification.date.split("T")[0]}/>
                                            </ListItemButton>
                                        </ListItem>

                                    )
                                }) :<ListItemText primary="Nothing new happened"> </ListItemText>
                            }

                        </List>
                    </div>


                    {/*<div className="center">*/}
                    {/*    <p>center div</p>*/}
                    {/*</div>*/}


                    <div className="center">
                        <h1>Most popular project</h1>
                        <h4>{mostPopularProject.nume}</h4>
                        <h5>Number of commits: {mostPopularProject.sizeOfCommits}</h5>
                        <h6>Locatie: {mostPopularProject.locatie}</h6>
                        <h4>The people who contributed</h4>
                        <ResponsiveContainer height={500} width={500} style={{marginTop: 10}}>
                            <PieChart width={100} height={100}>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={uniqueNames}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                    <div className="right-center-bottom">

                    </div>




                </div> : navigate("/clockingWorkingDay")
            }
        </div>

    )

};
export default Dashboard;
