import React from "react";
import apiURL from "../api";

export const Article = (props) => {
  function toMainPage(e) {
    e.preventDefault();
    props.setView("mainPage")
  }
  function toNewPageForm(e) {
    e.preventDefault();
    props.setView("newPageForm")
  }
  function toUpdatePage(e){
    e.preventDefault()
    props.setView("updatePage")
  }
  async function deleteThisPage(e) {
    e.preventDefault();
    const pageToDelete = await fetch(
      `${apiURL}/wiki/${props.selectedPage.slug}`,
      { method: "delete" }
    );
    props.fetchPages();
    props.setView("mainPage")
  }
  const tagList = []
  for(const tag of props.selectedPage.tags){
    tagList.push(tag.name)
  } 
  return (
    <div className="article">
      <h1>{props.selectedPage.title}</h1>
      <h2>by {props.selectedPage.author.name} • {props.selectedPage.author.email}</h2>
      <h3>Published on: {props.selectedPage.createdAt.toString().substring(0, 10)}</h3>
      <p className="pageContent">{props.selectedPage.content}</p>
      <p className="tags">Tags: {tagList.join(", ")}</p>
      <div className="singlePageButtons">
        <button className="articleButton" onClick={toMainPage}>Return to main page</button>
        <button className="articleButton" onClick={toNewPageForm}>Add a new page</button>
        <button className="articleButton" onClick={toUpdatePage}>Update this page</button>
        <button className="articleButton" onClick={deleteThisPage}>Delete this page</button>
      </div>
    </div>
  );
};
