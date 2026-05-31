import { Link } from "react-router-dom";

const NavigationLinks = [
    {to : "/", label : "Backup"},
    {to : "/schedule", label : "Schedule"}
]

function Menu() : React.ReactElement {
    return (
        <nav>
            <ul>
                {
                    NavigationLinks.map( (link) => (
                        <li>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                ))
                }
            </ul>
        </nav>
    );
};

export default Menu