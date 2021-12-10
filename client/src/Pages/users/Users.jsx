import React, { useEffect, useState } from "react";
import "./users.scss";
import User from "../../Components/user/User";
import { getData } from "../../utils/crudUtils";

const Users = () => {
  const [profiles, setProfiles] = useState(null);
  const getProfileData = async () => {
    const data = await getData("/profile/all");
    setProfiles(data.data);
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="container page">
      <div className="users">
        {profiles &&
          profiles.map((profile) => (
            <User key={profile._id} profile={profile} />
          ))}
      </div>
    </div>
  );
};

export default Users;
