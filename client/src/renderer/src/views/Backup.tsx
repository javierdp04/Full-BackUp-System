import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import TextButton from "../components/TextButton";

function Backup() : React.ReactElement {
    const [amountSaved, setAmountSaved] = useState(0);
    const [date , setDate] = useState<Date | string>();
    const [status, setStatus] = useState(false);
    const [spaceUsed, setSpaceUsed] = useState(0);

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
                    <TextButton title="Files to Back Up" description="Only files in the following folders are saved" onclick={() => {}}/>
                    <ul id="filesToBackUp" className="files-list"></ul>
                    <TextButton title="Exclude from Back Up" description="The following folders are excluded from the back up" onclick={() => {}}/>
                    <ul id="filesToExclude" className="files-list"></ul>
                </div>
            </main>
        </>
    );
}

export default Backup