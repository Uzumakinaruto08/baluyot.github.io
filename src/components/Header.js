import React, {useEffect, useState} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState ("Home");
    const location = useLocation();
    const [search, setSearch] = useState ("");

    const history = useHistory();

    useEffect(() =>{
        if(location.pathname === "/"){
            setActiveTab("Home");

        } else if (location.pathname ==="/add"){
            setActiveTab("AddContact");
        } else if (location.pathname === "/about") {
            setActiveTab("about");
        }
    },[location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?name=${search}`);
        setSearch("");
    }
    return (
        <div className="header">
            <p className="logo">Student Contact</p>
            <div className="header-right">
                <form onSubmit={handleSubmit} style={{display: "inline"}}>
                    <input
                    type="text"
                    className="inputField"
                    placeholder="Search Name ...."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                </form>
                <Link to="/">
                <p className={`${activeTab === "Home" ? "Active" : ""}`}
                    onClick={() => setActiveTab("Home")}

                 >
                    Home
                    </p>   
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddContact" ? "Active" : ""}`}
                    onClick={() => setActiveTab("AddContact")}

                 >
                    Add Contact
                    </p>   
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "Active" : ""}`}
                    onClick={() => setActiveTab("About")}

                 >
                    About
                    </p>   
                </Link>
            </div>

        </div>
    )
}

export default Header;