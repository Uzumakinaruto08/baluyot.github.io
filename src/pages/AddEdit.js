import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDb from "../firebase";
import { toast } from "react-toastify";



const initialState = {
    name: "",
    email: "",
    contact: "",
    status: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {name, email, contact, status} = state;

    const history = useHistory();

    const {id} = useParams ();

    useEffect(() => {
        fireDb.child("contacts").on("value",(snapshot) => {
            if(snapshot.val() !== null) {
                setData({...snapshot.val() });
            } else {
                setData({});
            }
        
    });
    return () => {
        setData({})
    }
    },[id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]});
        } else {
            setState({...initialState });
        };

        return () => {
            setState({...initialState });
        };
    },[id,data]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact || !status) {
            toast.error("Please provide value and each input field");
        } else {
            if(!id) {
                fireDb.child("contacts").push(state,(err) =>{
                    if(err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Added Successfully");
                    }
                });
            } else {
                fireDb.child(`contacts/${id}`).set(state,(err) =>{
                    if(err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Updated Successfully");
                    }
                });
            }
            
            setTimeout(() => history.push("/"), 500);
        }
    };
    return (
        <div>
            <div style={{marginTop: "100px"}}>
                <form 
                style={{
                    margin: "auto", 
                    padding:"15px", 
                    maxWidth:"400px", 
                    alignContent:"Center",
                }}
                onSubmit={handleSubmit}
                >
                    <label htmlFor='name'>Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name..."
                    value={name || ""}
                    onChange={handleInputChange}
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email..."
                    value={email || ""}
                    onChange={handleInputChange}
                    />
                    <label htmlFor='contact'>Contact</label>
                    <input
                    type="Number"
                    id="contact"
                    name="contact"
                    placeholder="Your Contact No. .."
                    value={contact || ""}
                    onChange={handleInputChange}
                    />
                    <label htmlFor='contact'>Status</label>
                    <input
                    type="text"
                    id="status"
                    name="status"
                    placeholder="Your Status. .."
                    value={status || ""}
                    onChange={handleInputChange}
                    />

                    <input type="submit" value={id ? "Update" : "Save"} />
                </form>
            </div>
        </div>
    )
}

export default AddEdit;