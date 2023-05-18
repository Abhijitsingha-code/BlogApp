import React, { useState } from "react";
import "./Float.css";
import CreateCategory from "../CreateCategory/CreateCategory";

const Float = () => {
  const [activeCate, setActivecate] = useState(false);

  return (
    <>
      <div className="floatDiv" onClick={() => setActivecate(!activeCate)}>
        {activeCate ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
      </div>
      {activeCate && <CreateCategory setActivecate={setActivecate}/>}
    </>
  );
};

export default Float;
