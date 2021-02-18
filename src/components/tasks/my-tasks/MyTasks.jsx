import React from 'react';
import { useState, useEffect  } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { getMyTasks } from '../../../core/api/tasks.api';


export function MyTasks(props) {
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyTasks(searchParam).then((tasks) => {
            setUserTasks(tasks);
        });
    }, [props.location.search]);
    
    return (
        <div className="my-tasks-wrapper">
            { userTasks.map(task => <TaskCard task={task} key={task.id} /> ) }
        </div>
    )
}

