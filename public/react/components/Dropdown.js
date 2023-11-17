import React from "react";
export function Dropdown (props){
    function setAuthorHandler(e){
        e.preventDefault()
        const authorID = e.target.getAttribute("authorid")
        const authorName = e.target.getAttribute("authorname")
        props.setSelectedAuthor({id: authorID, name: authorName})
        props.setView("singleAuthor")
    }
    return (
            <div className="dropdown">
              <button className="dropbtn">Authors</button>
              <div className="dropdown-content">
                {props.users.map((author, idx) => {
                  return (
                      <p onClick={setAuthorHandler} key={author.id} authorid={author.id} authorname={author.name}>{author.name}</p>
                  )
                })}
              </div>
            </div>)

}