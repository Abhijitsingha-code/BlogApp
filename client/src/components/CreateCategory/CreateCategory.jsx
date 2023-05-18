import React, { useState } from "react";
import "./CreateCategory.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = ({ setActivecate }) => {
  const [cate, setCate] = useState("");
  const url = import.meta.env.VITE_URL;

  const handleCate = async () => {
    try {
      await axios.post(`${url}/api/categories/`, {
        name: cate,
      });
      toast.success("Category has been added..", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setActivecate(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createCate">
      <ToastContainer />
      <label htmlFor="cate">Enter Category Name.</label>
      <input
        type="text"
        id="cate"
        value={cate}
        onChange={(e) => setCate(e.target.value)}
      />
      <button type="button" onClick={handleCate}>
        Add
      </button>
    </div>
  );
};

export default CreateCategory;
