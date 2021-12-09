import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../utils/crudUtils";
import "./profile.scss";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const data = await getData("/profile");
      setProfile(data.data);
      console.log(data.data);
    };
    getProfileData();
  }, []);
  return (
    <div className="profile-container">
      <div className="sidenav">
        <div className="profile">
          <img
            src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"
            alt=""
            width="100"
            height="100"
          />

          <div className="name">{profile?.user.name}</div>
          <div className="job">{profile?.status}</div>
        </div>

        <div className="sidenav-url">
          <div className="url">
            <Link to="/profile" className="active">
              Profile
            </Link>
            <hr align="center" />
          </div>
          <div className="url">
            <Link
              to={{
                pathname: "update-profile",
                state: {
                  profile,
                },
              }}
            >
              Edit Info
            </Link>
            <hr align="center" />
          </div>
        </div>
      </div>
      <div className="main">
        <div>
          <h2>IDENTITY</h2>
          <div className="card">
            <div className="card-body">
              <i className="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{profile?.user.name}</td>
                  </tr>
                  <tr>
                    <td>Handle</td>
                    <td>:</td>
                    <td>
                      {profile?.handle ? profile?.handle : "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>
                      {profile?.location ? profile?.location : "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>:</td>
                    <td>
                      {profile?.company ? profile?.company : "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>:</td>
                    <td>
                      {profile?.website ? profile?.website : "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Github</td>
                    <td>:</td>
                    <td>
                      {profile?.githubusername
                        ? profile?.githubusername
                        : "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td>Skill</td>
                    <td>:</td>
                    <td>
                      {profile?.skills
                        ? profile?.skills?.join(", ")
                        : "Not Available"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h2>SOCIAL MEDIA</h2>
          <div className="card">
            <div className="card-body">
              <i className="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Facebook</td>
                    <td>:</td>
                    <td>{profile?.facebook ? profile?.facebook : "Not Set"}</td>
                  </tr>
                  <tr>
                    <td>Instagram</td>
                    <td>:</td>
                    <td>
                      {profile?.instagram ? profile?.instagram : "Not Set"}
                    </td>
                  </tr>
                  <tr>
                    <td>Twitter</td>
                    <td>:</td>
                    <td>{profile?.twitter ? profile?.twitter : "Not Set"}</td>
                  </tr>
                  <tr>
                    <td>LinkedIN</td>
                    <td>:</td>
                    <td>{profile?.linkedin ? profile?.linkedin : "Not Set"}</td>
                  </tr>
                  <tr>
                    <td>Youtube</td>
                    <td>:</td>
                    <td>{profile?.youtube ? profile?.youtube : "Not Set"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
