import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Article } from "./Article";
import { NewPageForm } from "./NewPageForm";
import { SingleAuthorView } from "./SingleAuthorView";
import './../../style.css'

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { createContext } from "react";
const mainViewContext = createContext(null);
const PagesDataContext = createContext(null)

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState({});
  const [view, setView] = useState("mainPage")
  const [users, setUsers] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState("")

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }
  async function fetchAuthors(){
    try{
      const currentAuthorIds = []
      for(const page of pages){
        currentAuthorIds.push(page.authorId)
      }
      console.log(pages)
      console.log(currentAuthorIds)
      const response = await fetch(`${apiURL}/users`)
      const userData = await response.json()
      
      const filteredUserData = userData.filter((x) => currentAuthorIds.includes(x.id))
      setUsers(filteredUserData)
    } catch (err) {
      console.log("Oh no an error ", err)
    }
  }
  function setAuthorHandler(e){
    e.preventDefault()
    const authorID = e.target.getAttribute("authorid")
    const authorName = e.target.getAttribute("authorname")
    setSelectedAuthor({id: authorID, name: authorName})
    setView("singleAuthor")
  }
  useEffect(() => {
    fetchPages()
    fetchAuthors();
  }, []);

  return (
    <PagesDataContext.Provider value={pages}>
      <mainViewContext.Provider value={view}>
        <main>
          <h1>WikiVerse</h1>
          <h2>An interesting 📚</h2>
          {view === "mainPage" ? (
            <>
            <div className="dropdown">
              <button className="dropbtn">Authors</button>
              <div className="dropdown-content">
                {users.map((author, idx) => {
                  return (
                      <p onClick={setAuthorHandler} authorid={author.id} authorname={author.name}>{author.name}</p>
                  )
                })}
              </div>
            </div>
            <PagesList
              pages={pages}
              setSelectedPage={setSelectedPage}
              view={view}
              setView={setView}
            />
            </>
          ) : (
            <></>
          )}
          {view === "singlePage" ? (
            <Article
              fetchPages={fetchPages}
              selectedPage={selectedPage}
              view={view}
              setView={setView}
            />
          ) : (
            <></>
          )}
          {view === "newPageForm" ? (
            <NewPageForm
              fetchPages={fetchPages}
              setPages={setPages}
              view={view}
              setView={setView}
            />
          ) : (
            <></>
          )}
          {view === "singleAuthor" ? (
            <SingleAuthorView
            pages={pages}
            selectedAuthor={selectedAuthor}
            setSelectedPage={setSelectedPage}
            view={view}
            setView={setView}
            setPages={setPages}
          />
          ) : (
            <></>
          )}
        </main>
      </mainViewContext.Provider>
    </PagesDataContext.Provider>
  );
};
