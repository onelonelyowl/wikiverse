import React from "react";
import { Page } from "./Page";

export const PagesList = (props) => {
  return (
    <>
      {props.pages.map((page, idx) => {
        return (
          <Page
            page={page}
            key={idx}
            setSelectedPage={props.setSelectedPage}
            toggleSinglePageView={props.toggleSinglePageView}
            toggleMainView={props.toggleMainView}
            mainView={props.mainView}
            singlePageView={props.singlePageView}
          />
        );
      })}
    </>
  );
};
