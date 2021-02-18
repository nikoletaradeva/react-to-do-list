import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = 'http://localhost:3002';

export const TaskStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

export const TaskAssessment = {
    One: '1',
    Two: '2',
    Three: '3',
    Four: '4',
    Five: '5',
    Six: '6',
    Seven: '7',
    Eight: '8',
    Nine: '9',
    Ten: '10'
}

export async function getAllTasks(serachParam) {
    const allTasks = (await axios.get(`${apiUrl}/tasks`)).data;

    if(!serachParam) {
        return allTasks;
    }

    const loweredParam = serachParam.toLowerCase();
    return allTasks.filter(task => task.title.toLowerCase().includes(loweredParam) || task.description.toLowerCase().includes(loweredParam));
}

export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}

export async function getTasksByAuthorId(authorId, serachParam) {
    const allTasks = await getAllTasks(serachParam);

    return allTasks.filter(task => task.authorId === authorId);
}

export function getMyTasks(serachParam) {
    const loggedUserId = getLoggedUser().id;

    return getTasksByAuthorId(loggedUserId, serachParam);
}

export function saveTask(taskData) {
    const loggedUser = getLoggedUser();

    if (taskData.id) {
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }

    taskData.authorId = loggedUser.id;
    taskData.authorName = loggedUser.name;
    taskData.date = new Date();
    if(!taskData.state)
    taskData.status = TaskStatus.Active;

    if(!taskData.status) {
        taskData.status = TaskStatus.Active;
    }

    // if(!taskData.аssessment)
    // taskData.аssessment = TaskAssessment.One;

    // if(!taskData.аssessment) {
    //     taskData.аssessment = TaskAssessment.One;
    // }


    return axios.post(`${apiUrl}/tasks`, taskData);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}

export async function deleteTasksForAuthor(authorId) {
    const tasks = await getTasksByAuthorId(authorId);

    tasks.forEach(task => {
        deleteTask(task.id);
    });
}