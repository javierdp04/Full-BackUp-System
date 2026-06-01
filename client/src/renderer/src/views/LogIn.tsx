function LogIn() : React.ReactElement {
    return (
        <main>
            <div className="container">
                <form>
                    <input id="username" placeholder="username" type="text"/>
                    <input id="password" placeholder="password" type="password"/>
                    <button>Log-in</button>
                </form>
            </div>
        </main>
    )
}

document.querySelector("button")?.addEventListener("onclick", () => {

})

export default LogIn