import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./User.css";
import moment from "moment";

const UserPage = () => {
  const [allUsers, setAllUsers] = useState();
  const url = import.meta.env.VITE_URL;
  const PF = `${url}/images/`;
  const noImage =
    "https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg";

  // const handleDelete = async(id)=>{
  //   // if(confirm("Do You want to delete the account?")){
  //     try {
  //       await axios.delete(`http://localhost:5000/api/users/${id}`, {
  //         data: { userId: id},
  //       });
  //       toast.success('Account has been deleted successfully..', {
  //         position: "bottom-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   // }
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${url}/api/users`);
      setAllUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="userpage">
      <ToastContainer />
      {allUsers?.map((user, ind) => (
        <div className="user_container" key={ind}>
          <img src={user.profilePic ? PF + user.profilePic : noImage} alt="" />
          <h4>{user.username}</h4>
          <p>
            <i className="fa-regular fa-envelope-open"></i>
            {user.email}
          </p>
          <p>Joined on {moment(user.createdAt).format("LLLL")}</p>
          {/* <button onClick={handleDelete(user._id)}>Remove user</button> */}
        </div>
      ))}
    </div>
  );
};

export default memo(UserPage);
