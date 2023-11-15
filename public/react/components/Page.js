import React from "react";
import apiURL from "../api";

export const Page = (props) => {
  async function singlePageHandler(e) {
    e.preventDefault();
    const response = await fetch(`${apiURL}/wiki/${props.page.slug}`);
    const data = await response.json();
    props.setSelectedPage(data);
    props.toggleMainView(!props.mainView);
    props.toggleSinglePageView(!props.singlePageView);
  }
  return (
    <>
      <h3 className="articleTitle" onClick={singlePageHandler}>{props.page.title}</h3>
    </>
  );
};
