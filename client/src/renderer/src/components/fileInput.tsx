interface FileInputProps {
    title : string,
    description : string,
    setFiles : (files : File[]) => void
}

const FileInput = ({title, description, setFiles} : FileInputProps) => {

    return (
        <div>
            <h3> { title }</h3>
            <p> { description }</p>
            <input type="file" multiple onChange={ (e) => handleChange(e, setFiles) }/>
        </div>
    )
}

const handleChange = (e : React.ChangeEvent<HTMLInputElement>, setFiles : (files : File[]) => void) => {
    if(e.target.files != null) {
        setFiles([...e.target.files]);
    }
}

export default FileInput;