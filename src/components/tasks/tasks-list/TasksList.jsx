import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask } from './../../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard'

export function TasksList(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const serachParam = props.location.search.split("=")[1];
        getAllTasks(serachParam).then((result) => {
            setTasks(result);
        });
    }, [props.location.search])

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            })
        })
    };
    
    return (
        <div className="tasks-list-wrapper">
            { tasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onDelete}/> )}
        </div>
    );
}