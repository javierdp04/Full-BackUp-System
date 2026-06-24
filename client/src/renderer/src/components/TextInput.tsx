import React, { useEffectEvent } from "react"

interface TextInputProps {
    inputId : string,
    title : string,
    description : string,
    type : string,
    setState : Function,

}

const TextInput = ({inputId, title, description, type, setState } : TextInputProps) => {
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(!files) return;
        
        const arrayFiles : File[] = Array.from(files);
        setState(arrayFiles);
    }

    return (
        <div className="section-header">
            <div className="header-text">
                <h3>{ title }</h3>
                <p>{ description }</p>
            </div>
            <input id= { inputId } type= { type } multiple onChange={ handleChange }/>
        </div>
    )
}

export default TextInput;
