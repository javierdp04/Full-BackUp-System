import { useState } from "react"

function LogIn() : React.ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const isDisable = !username.trim() || !password.trim()
    return (
        <main>
            <div className="container">
                <form>
                    <input id="username" placeholder="username" type="text" value= { username } onChange={(e) => setUsername(e.target.value)} />
                    <input id="password" placeholder="password" type="password" value = { password } onChange={(e) => setPassword(e.target.value)} />
                    <button disabled= { isDisable }>Log-in</button>
                </form>
            </div>
        </main>
    )
}

document.querySelector("button")?.addEventListener('onclick', () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    
})

export default LogIn