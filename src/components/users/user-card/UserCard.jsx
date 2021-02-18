import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

const cardStyle = {
    width: '18rem'
};

export function UserCard({ user, onDelete }) {
    const loggedUser = getLoggedUser();
    
    return (
    <div className="user-card-bg m-1" style={cardStyle}>
          <img className="user-img" src={user.picture} alt={user.name} />
          <div className="">
            <h5 className="user-name"><Link className="user-name" to={`/users/${user.id}`}>{user.name}</Link></h5>
          </div>
          <ul className="list-group-info">
            <li className="">Age: {user.age}</li>
            <li className="">Email: {user.email}</li>
          </ul>
          { loggedUser.isAdmin && <div className="card-body">
            <Link className="d-inline-flex" to={`/users/edit/${user.id}`}><img src="https://image.flaticon.com/icons/png/512/2921/2921222.png" alt="edit" width="25px" height="25px"/></Link>
            <div className="cursor-pointer d-inline-flex m-1" onClick={() => onDelete(user.id)}> <img src="https://image.flaticon.com/icons/png/512/2603/2603105.png" alt="delete" width="25px" height="25px"/></div>
            <p className="card-text"><small className="text-color">Last updated 3 mins ago</small></p>
          </div> }
    </div>
     
    );
}