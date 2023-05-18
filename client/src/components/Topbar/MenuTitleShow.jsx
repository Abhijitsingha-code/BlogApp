import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuTitleShow = ({icon , title, path, logOut}) => {
  const [showTitle, setShowTitle] = useState(false);
  const showTitles = () => {
    setShowTitle(true);
  };
  const hideTitles = () => {
    setShowTitle(false);
  };

  const RenderTitle = ({ name }) => {
    return (
      <p className="hamTopTitle">
        {name}
      </p>
    );
  };
  return (
    <Link
      to={path}
      className="hamTopListItems"
      onMouseOver={showTitles}
      onMouseLeave={hideTitles}
      onClick={logOut && logOut}
    >
      <i className={`topIcon fa-solid ${icon}`}></i>
      {showTitle && <RenderTitle name={title} />}
    </Link>
  );
};

export default MenuTitleShow;
