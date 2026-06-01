import React from "react";

interface TextButtonProps {
    title : string,
    description : string
    onclick : () => void
}

function TextButton({title, description, onclick} : TextButtonProps) : React.ReactElement {
    return (
        <div className="section-header">
            <div className="header-text">
                <h3>{ title }</h3>
                <p>{ description }</p>
            </div>
            <button className="SelectDirButton" onClick={ onclick }></button>
        </div>
    );
}

export default TextButton