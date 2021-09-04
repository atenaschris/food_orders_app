import React from 'react';

import classes from './UserProfile.module.css';

import UserForm from '../components/User/UserForm';

const UserProfile = ()=>{
    return <div className={classes['user-profile-wrapper']}>
         <h2>Welcome to your profile page!!!</h2>
        <UserForm/>
    </div>
};

export default UserProfile;