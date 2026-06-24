import { useEffect, useState } from "react";
import Menu from "../components/Menu";
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
        let newFilesToExclude : File[] = filesPathsToExclude; 

        for(let i = filesPathsToExclude.length-1; i>=0;i--) {
            const pathToExclude = filesPathsToExclude[i];

            if(!pathToExclude) continue;

            if(filesPathsToInclude.includes(pathToExclude)) {
                newFilesToExclude = newFilesToExclude.toSpliced(i, 1);
            }
        }   

        setFileToExclude(newFilesToExclude);
    }, [filesPathsToExclude, filesPathsToInclude])

    const handleBackup = async () =>  {
       
    }
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
                    <button onClick={ handleBackup }>Backup now</button>
                    <TextInput inputId= "filesToInclude" title="Files to Back Up" description="Only files in the following folders are saved" setState={ setFileToInclude} type="file"/>
                    <ul id="filesToBackUp" className="files-list">
                        {
                            filesPathsToExclude.map((e) => (
                                <li>{e.name}</li>
                            ))
                        }
                    </ul>
                    <TextInput inputId= "filesToExclude" title="Exclude from Back Up" description="The following folders are excluded from the back up" setState={ setFileToExclude } type="file"/>
                    <ul id="filesToExclude" className="files-list">
                        {
                            filesPathsToInclude.map((e) => (
                                <li>{e.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </main>
        </>
    );
}

export default Backup