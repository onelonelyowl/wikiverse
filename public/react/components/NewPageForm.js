import Page from "./Page";
import React, { useState, useEffect } from "react";
import apiURL from "../api";
// import fetchPages from './App'

export const NewPageForm = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleTags, setArticleTags] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const dataToPost = {
      name: authorName,
      email: authorEmail,
      title: articleTitle,
      slug: articleTitle.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase(),
      content: articleContent,
      status: "closed",
    };
    const response = await fetch(`${apiURL}/wiki/`, {
      method: "post",
      body: JSON.stringify(dataToPost),
      headers: { "Content-Type": "application/json" },
    });
    const createdPage = await response.json();
    props.fetchPages();
    props.setView("mainPage")
  }
  function returnHome(e){
    e.preventDefault()
    props.setView("mainPage")
  }
  return (
    // need to add functionality to check if author exists before adding them to users, then just add them to the article instead of the new author
    <div className="newPageForm">
      <form>
        <h3 className="formSubheader">Author details</h3>
        <div className="formRow">
        <label className="formLabel">
          Name:
        </label>
        <input
            type="text"
            placeholder="enter your name here"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
        />
        </div>
        <div className="formRow">
        <label className="formLabel">
          Email:
        </label>
        <input
            type="email"
            placeholder="enter your email here"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
        />
        </div>
        <h3 className="formSubheader">Article details</h3>
        <div className="formRow">
        <label className="formLabel">
          Title:
        </label>
        <input
            type="text"
            placeholder="enter your article title here"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
        />
        </div>
        <div className="formRow">
        <label className="formLabel">
          Content:
        </label>
        <input
            type="text"
            placeholder="enter your article content here"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
        />
        </div>
        <div className="formRow">
        <label className="formLabel">
          Tags:
        </label>
        <input
            type="text"
            placeholder="enter your tags here (single word, space seperated please)"
            value={articleTags}
            onChange={(e) => setArticleTags(e.target.value)}
        />
        </div>
        <div className="buttons">
        <button onClick={handleSubmit} type="submit">
          Add page
        </button>
        <button onClick={returnHome}>Return to main page</button>
        </div>
      </form>
    </div>
  );
};
