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
    props.toggleNewPageForm(!props.newPageForm);
    props.toggleMainView(!props.mainView);
  }
  return (
    // need to add functionality to check if author exists before adding them to users, then just add them to the article instead of the new author
    <>
      <form>
        <p className="formSubheader">Author details</p>
        <label className="formLabel">
          Name:
          <input
            type="text"
            placeholder="enter your name here"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </label>
        <br />
        <label className="formLabel">
          Email:
          <input
            type="email"
            placeholder="enter your email here"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />
        </label>
        <p className="formSubheader">Article details</p>
        <label className="formLabel">
          Title:
          <input
            type="text"
            placeholder="enter your article title here"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </label>
        <br />
        <label className="formLabel">
          Content:
          <input
            type="text"
            placeholder="enter your article content here"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          />
        </label>
        <br />
        <label className="formLabel">
          Tags:
          <input
            type="text"
            placeholder="enter your tags here (single word, space seperated please)"
            value={articleTags}
            onChange={(e) => setArticleTags(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSubmit} type="submit">
          Add page
        </button>
      </form>
    </>
  );
};
