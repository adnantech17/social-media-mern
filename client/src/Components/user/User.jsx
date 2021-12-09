import React from "react";
import "./user.scss";
const User = ({ profile }) => {
  console.log(profile);
  return (
    <div className="user">
      <div className="card-user">
        <div className="content">
          <div className="detail">
            <h2>
              {profile.user.name}
              <br />
              <span>{profile.status && profile.status}</span>
            </h2>
            <ul className="sci">
              <li>
                <a href={profile.facebook ? profile.facebook : "#"}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href={profile.twitter ? profile.twitter : "#"}>
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href={profile.linkedin ? profile.linkedin : "#"}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href={profile.instagram ? profile.instagram : "#"}>
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
