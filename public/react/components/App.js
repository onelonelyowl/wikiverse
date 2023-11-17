import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Article } from "./Article";
import { NewPageForm } from "./NewPageForm";
import { SingleAuthorView } from "./SingleAuthorView";
import { Dropdown } from "./Dropdown";
import { UpdateArticle } from './UpdateArticle';
import './../../style.css'

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { createContext } from "react";
const UsersContext = createContext(null);
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
      console.log(`pages set as: ${pages}`)
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
  useEffect(() => {
    fetchPages()
    fetchAuthors();
  }, [view]);

  return (
    <PagesDataContext.Provider value={pages}>
      <UsersContext.Provider value={users}>
        <main>
          <h1>WikiVerse</h1>
          <h2>📚 I AM A BEACON OF KNOWLEDGE BLAZING OUT ACROSS A BLACK SEA OF IGNORANCE 📚</h2>
          {view === "mainPage" ? (
          <div className="mainPage">
            <Dropdown 
              pages={pages}
              view={view}
              setView={setView}
              users={users}
              setSelectedAuthor={setSelectedAuthor}
            />
            <PagesList
              pages={pages}
              setSelectedPage={setSelectedPage}
              view={view}
              setView={setView}
            />
          </div>
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
          {view === "updatePage" ? (
            <UpdateArticle
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
      </UsersContext.Provider>
    </PagesDataContext.Provider>
  );
};
