import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Article } from './Article'
import { NewPageForm } from './NewPageForm'

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { createContext } from 'react';
const mainViewContext = createContext(null)
const singlePageContext = createContext(null)

export const App = () => {
	const [singlePageView, toggleSinglePageView] = useState(false)
	const [mainView, toggleMainView] = useState(true)
	const [pages, setPages] = useState([]);
	const [selectedPage, setSelectedPage] = useState({})
	const [newPageForm, toggleNewPageForm] = useState(false)

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
	async function getSinglePage(e){

	}
	
	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<singlePageContext.Provider value={singlePageView}>
		<mainViewContext.Provider value={mainView}>
		<main>	
      	<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			{mainView === true ? 
				<PagesList pages={pages} setSelectedPage={setSelectedPage} toggleSinglePageView={toggleSinglePageView} toggleMainView={toggleMainView} mainView={mainView} singlePageView={singlePageView}/>
				:
				<></>
			}
			{singlePageView === true ?
				<Article fetchPages={fetchPages} selectedPage={selectedPage} toggleSinglePageView={toggleSinglePageView} toggleMainView={toggleMainView} mainView={mainView} singlePageView={singlePageView} newPageForm={newPageForm} toggleNewPageForm={toggleNewPageForm}/>
			:
			<></>
			}
			{newPageForm === true ? 
				<NewPageForm fetchPages={fetchPages} setPages={setPages} toggleNewPageForm={toggleNewPageForm} newPageForm={newPageForm} toggleMainView={toggleMainView} mainView={mainView}/>
			:
			<></>}
		</main>
		</mainViewContext.Provider>
		</singlePageContext.Provider>
	)
}