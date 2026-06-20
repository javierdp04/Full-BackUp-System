import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import TextButton from "../components/TextButton";
import TextInput from "../components/TextInput";

function Backup() : React.ReactElement {
    const [amountSaved, setAmountSaved] = useState(0);
    const [date , setDate] = useState<Date | string>();
    const [status, setStatus] = useState(false);
    const [spaceUsed, setSpaceUsed] = useState(0);

    const [filesPathsToInclude, setFileToInclude] = useState<File[]>([]);
    const [filesPathsToExclude, setFileToExclude] = useState<File[]>([]);

    useEffect(() =>{
        async function loadMetaData() {
            const response = await window.electronApi.loadBackupState()
            if(response){
                setStatus(response.status);
                setAmountSaved(response.amountSaved);
                setSpaceUsed(response.spaceUsed);
                setDate(response.date);
            }
        }
    }, [])

    useEffect(() => {

    }, [filesPathsToExclude, filesPathsToInclude])

    return (
        <>
            <Menu />
            <main>
                <div className="container">
                    <button></button>
                    <button>
                        <span>Last Backup {status ? "Sucesfull" : "Never" }</span>
                        <span>  { date ? new Date(date).toLocaleDateString("en-US") : "Never" } </span>
                    </button>
                    <button></button>
                    <TextInput title="Files to Back Up" description="Only files in the following folders are saved" setState={ setFileToInclude} type="file"/>
                    <ul id="filesToBackUp" className="files-list"></ul>
                    <TextInput title="Exclude from Back Up" description="The following folders are excluded from the back up" setState={ setFileToExclude } type="file"/>
                    <ul id="filesToExclude" className="files-list"></ul>
                </div>
            </main>
        </>
    );
}

export default Backup