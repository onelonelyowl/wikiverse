import React from "react";
import { Page } from "./Page";

export const SingleAuthorView = (props) => {
    function returnHomeHandler(e){
        e.preventDefault()
        props.setView("mainPage")
    }
    return (
    <>
    <h1>Articles from {props.selectedAuthor.name}</h1>
      {props.pages.map((page, idx) =>  Number(page.authorId) === Number(props.selectedAuthor.id) ?
          <Page
            page={page}
            key={idx}
            setSelectedPage={props.setSelectedPage}
            view={props.view}
            setView={props.setView}
          /> :
          <></>
          )}
        <button onClick={returnHomeHandler}>Return to all authors</button>
    </>
  )}
    ;
