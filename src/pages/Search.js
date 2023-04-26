import React, {useState, useEffect} from "react";
import { useLocation, Link } from "react-router-dom";
import fireDb from "../firebase";
import "./Search.css";


const Search = () => {
    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("name");
    console.log("search", search);

    useEffect(() => {
        searchData();

    }, [search]);

    const searchData =  () => {
        fireDb
        .child("contacts")
        .orderByChild("name")
        .equalTo(search)
        .on("value",(snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val ();
                setData(data);
            }
        });
        
    }
    return (
        <>
             <div style={{marginTop: "100px"}}>
                <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                </Link>
                {Object.keys(data).length === 0 ? (
                    <h2>No Search found with that Name : {query.get("name")}</h2>
                ): (
                    <table className='styled-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>No.</th>
                            <th style={{textAlign: "center"}}>Name.</th>
                            <th style={{textAlign: "center"}}>Email.</th>
                            <th style={{textAlign: "center"}}>Contact.</th>
                            
                        </tr>
                    </thead>
                            <tbody>
                                {Object.keys(data).map((id, index) =>{
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data[id].name}</td>
                                            <td>{data[id].email}</td>
                                            <td>{data[id].contact}</td>
                                        
                                        </tr>
                                    );
                                })}
                            </tbody>
                    </table>   
                    )}
                
            </div>
        </>
    );
};

export default Search;