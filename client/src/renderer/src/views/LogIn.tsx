import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import type { AuthState } from "../../../shared/models/models";

function LogIn() : React.ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState<AuthState>('Unauthorized');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const isDisable = !username.trim() || !password.trim()

    const handleSubmit = async(e : React.SubmitEvent) => {
        const serverUrl : string = await window.electronApi.getEnvVariable("SERVER_URL");
        const res = await fetch(`${serverUrl}/auth/login`,{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username, password})
        });

            if(!res.ok) {
                setState('Unauthorized');
                setError("Try again");
            }
            else {
                const data = await res.json();
                localStorage.setItem("token", data["token"]);
                setState('Authorized');
            }
        return state == 'Authorized' ? navigate("/") : navigate("/login");
    }

    return (
        <main>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input id="username" placeholder="username" type="text" value= { username } onChange={(e) => setUsername(e.target.value)} />
                    <input id="password" placeholder="password" type="password" value = { password } onChange={(e) => setPassword(e.target.value)} />
                    <button disabled= { isDisable }>Log-in</button>
                    {error=='' ? <></> : <p className="error">{ error }</p>}
                </form>
            </div>
        </main>
    )
}


export default LogIn;