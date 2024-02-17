import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const SingleNotePage = () => {
    const {id} = useParams(); // Access the id parameter directly
    const [note, setNote] = useState({});

    useEffect(() => {
        getObjectData();
    }, [id]);

    const updateNote = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        const data = {
            "body": note.body
        };
        const body = JSON.stringify(data);
        fetch(`/api/notes/${id}/`, {
            method: 'PATCH',
            headers: headers,
            body: body
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error updating note:', error);
        });
    };

    const getObjectData = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        fetch(` http://127.0.0.1:8000/api/notes/${id}/`, {
            method: 'GET',
            headers: headers
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch note');
            }
            return response.json();
        })
        .then((response) => {
            setNote(response);
        })
        .catch((error) => {
            console.error('Error fetching note:', error);
        });
    };

    const handleSubmit = () => {

        if(id !== 'new' && note.body === ''){
            deleteNode();
        }else if(id !== 'new'){
            updateNote();
        }else if(id === 'new' && note.body !== ''){
            createNode();
        }
        
    };

    const onChangeText = (event) => {
        setNote((prev) => ({
            ...prev,
            body: event.target.value
        }));
    };

    const deleteNode = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        fetch(` http://127.0.0.1:8000/api/notes/${id}/`, {
                method: 'DELETE',
                headers: headers,
            }).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
    }

    const createNode = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        const data = {
            "body": note.body
        };
        const body = JSON.stringify(data);
        fetch(` http://127.0.0.1:8000/api/notes/`, {
            method: 'POST',
            headers: headers,
            body: body
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error updating note:', error);
        });
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link> 
                </h3>
                {id !== 'new' ? (<Link to="/">
                        < button onClick={deleteNode}>Delete</button>
                </Link>) : (<Link to="/">
                        < button onClick={createNode}>Done</button>
                </Link>)}
                
            </div>
            <textarea value={note.body} onChange={onChangeText}></textarea>
        </div>
    );
};

export default SingleNotePage;

