import React, { useState, useEffect } from 'react';
import { saveTask, getTaskById } from '../../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';
import './TaskEdit.css'

const selectStyle = {
    width: '100%',
    height: '36px',
    borderRadius: '5px',
}

const listStyle = {
    height: '100px'
}

export function TaskEdit(props) {

    const [currentTask, setCurrentTask] = useState({title: '', description: '', authorId: '', authorName: '', date: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    console.log(props);
    useEffect(() => {
        if (props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id).then((result) => {
                setCurrentTask(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(() => { 
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
        { shouldRedirect && <Redirect to="/tasks" /> }
        <div className="task-edit-wrapper">
            <form className="task-edit-form app-cover" onSubmit={onTaskSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTask.title} />
                </div>
                <div className="form-group">
                    <label labelfor="description">Description: </label>
                    <textarea className="form-control" id="description" name="description" onChange={onInputChange} value={currentTask.description} style={listStyle}/>
                </div>
                <div className="form-group">
                    <label labelfor="status">Status: </label>
                    <select className="form-control" name="status" id="status" onChange={onInputChange} value={currentTask.status} style={selectStyle}>
                        <option className="bg-color-active" value="Active">Active</option>
                        <option className="bg-color-pending" value="Pending">Pending</option>
                        <option className="bg-color-done" value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label labelfor="аssessment">Assessment:</label>
                    <input className="form-control"  type="number" name="аssessment" id="аssessment" min="1" max="10" 
                    onChange={onInputChange} value={currentTask.аssessment}/>
                </div>
                <button className="btn btn-outline-info">Save task</button>
            </form>
        </div>
        </>
    )
}