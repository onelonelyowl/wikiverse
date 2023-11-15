import React from "react";
import apiURL from "../api";

export const Article = (props) => {
  function toMainPage(e) {
    e.preventDefault();
    props.toggleSinglePageView(!props.singlePageView);
    props.toggleMainView(!props.mainView);
  }
  function toNewPageForm(e) {
    e.preventDefault();
    props.toggleSinglePageView(!props.singlePageView);
    props.toggleNewPageForm(!props.newPageForm);
  }
  async function deleteThisPage(e) {
    e.preventDefault();
    const pageToDelete = await fetch(
      `${apiURL}/wiki/${props.selectedPage.slug}`,
      { method: "delete" }
    );
    props.fetchPages();
    props.toggleSinglePageView(!props.singlePageView);
    props.toggleMainView(!props.mainView);
  }
  return (
    <>
      <h1>{props.selectedPage.title}</h1>
      <span>{props.selectedPage.author.name} • </span>
      <span>{props.selectedPage.author.email}</span>
      <p>{props.selectedPage.createdAt.toString().substring(0, 10)}</p>
      <p>{props.selectedPage.content}</p>
      <button onClick={toMainPage}>Return to main page</button>
      <button onClick={toNewPageForm}>Add a new page</button>
      <button onClick={deleteThisPage}>Delete this page</button>
    </>
  );
};
