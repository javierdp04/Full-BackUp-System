import TextButton from "../TextButton";

function Backup() : React.ReactElement {
    return (
        <div className="container">
            <button></button>
            <button></button>
            <button></button>
            <TextButton title="Files to Back Up" description="Only files in the following folders are saved" onclick={() => {}}/>
            <ul id="filesToBackUp" className="files-list"></ul>
            <TextButton title="Exclude from Back Up" description="The following folders are excluded from the back up" onclick={() => {}}/>
            <ul id="filesToExclude" className="files-list"></ul>
        </div>
    );
}

export default Backup