import React from "react";
import apiURL from "../api";

export const Page = (props) => {
  async function singlePageHandler(e) {
    e.preventDefault();
    const response = await fetch(`${apiURL}/wiki/${props.page.slug}`);
    const data = await response.json();
    props.setSelectedPage(data);
    props.setView("singlePage")
  }
  return (
    <>
      <h3 className="articleTitle" onClick={singlePageHandler}>{props.page.title}</h3>
    </>
  );
};
