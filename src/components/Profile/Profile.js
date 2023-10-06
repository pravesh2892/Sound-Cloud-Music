import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

function Profile() {
  const userAuthentication = useSelector((store) => store.authentication);

  const { user, email } = userAuthentication;
  console.log(userAuthentication);
  return (
    <div className="profile-section">
      <img
        className="profile-picture"
        src={
          "https://i0.wp.com/toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
        }
        alt="Profile"
      />
      <div className="profile-details">
        <p className="profile-username">{user}</p>
        <p className="profile-email">{email}</p>
      </div>
    </div>
  );
}

export default Profile;
