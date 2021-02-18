import React from "react";
import { Link } from "react-router-dom";
import "./TaskCard.css";
import { getLoggedUser } from '../../../core/api/users.api';
import { TaskAssessment } from "../../../core/api/tasks.api";

const taskCardStyle = {
    maxWidth: '18rem'
};

const deleteBtnStyles = {
    cursor: 'pointer'
};

export function TaskCard({ task, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let taskClassByType = "";
    switch(task.аssessment) {
        case TaskAssessment.One:
            taskClassByType += "bg-success";
        break;
        case TaskAssessment.Two:
            taskClassByType += "bg-success";
        break;
        case TaskAssessment.Three:
            taskClassByType += "bg-success";
        break;
        case TaskAssessment.Four:
            taskClassByType += "bg-success";
        break;
        case TaskAssessment.Five:
            taskClassByType += "bg-info";
        break;
        case TaskAssessment.Six:
            taskClassByType += "bg-info";
        break;
        case TaskAssessment.Seven:
            taskClassByType += "bg-info";
        break;
        case TaskAssessment.Eight:
            taskClassByType += "bg-danger";
        break;
        case TaskAssessment.Nine:
            taskClassByType += "bg-danger";
        break;
        case TaskAssessment.Ten:
            taskClassByType += "bg-danger";
        break;
        default:
        break;
    }


	return (
		<div className="single-task bg-tasks m-2" style={taskCardStyle}>
			<div className="cards">
                <div className={taskClassByType}>
                    { task.title }
                </div>
                <div className="card-header" >
                    { (loggedUser.isAdmin || loggedUser.id === task.authorId) &&  <Link className="m-2" to={`/tasks/task-edit/${task.id}`}> <img src="https://image.flaticon.com/icons/png/512/2921/2921222.png" alt="edit" width="25px" height="25px"/></Link> }
                    { (loggedUser.isAdmin || loggedUser.id === task.authorId) &&  <span style={deleteBtnStyles} onClick={() => onDeleteClick(task.id)}><img src="https://image.flaticon.com/icons/png/512/2603/2603105.png" alt="delete" width="25px" height="25px"/></span> }
                </div>
                <div className="description">
                    <p>{task.description}</p>
                </div>
                <div className="card-footer">
                    <div>Author: {task.authorName}</div>
                    {/* <div>Created on: {task.date}</div> */}
                    <p className="card-text"><small className="text-color">{task.date}</small></p>
                </div>
            </div>
		</div>
	)
}

