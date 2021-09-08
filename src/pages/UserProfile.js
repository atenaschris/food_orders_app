import React from "react";

import classes from "./UserProfile.module.css";

import UserForm from "../components/User/UserForm";

const UserProfile = () => {
  return (
    <div className={classes["user-profile-wrapper"]}>
      <UserForm />
    </div>
  );
};

export default UserProfile;
