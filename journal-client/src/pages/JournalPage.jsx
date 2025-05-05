import { useState, useEffect } from "react";
import API from "../api";

function JournalPage() {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchEntries = async () => {
        const res = await API.get('/entries');
        setEntries(res.data);
    };

    const startEdit = (entry) => {
        setForm({ title: entry.title, content: entry.content });
        setEditingId(entry.id);
    }

    // const addEntry = async (e) => {
    //     e.preventDefault();
    //     await API.post('/entries', form);
    //     setForm({ title: '', content: '' });
    //     fetchEntries();
    // }

    const submitForm = async (e) => {
        e.preventDefault();
        if (editingId){
            await API.put(`/entries/${editingId}`, form);
        } else {
            await API.post('/entries', form);
        }
        setForm({ title: '', content: '' });
        setEditingId(null);
        fetchEntries();
    }

    const deleteEntry = async (id) => {
        await API.delete(`/entries/${id}`)
        fetchEntries();
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="journal-container">
            <h2 className="joural-title">My Journal</h2>
            <form className="entry-form" onSubmit={submitForm}>
                <input 
                    className="entry-input"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm(
                        {
                            ...form,
                            title: e.target.value
                        }
                    )} 
                />
                <textarea 
                    className="entry-textarea"
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm(
                        {
                            ...form,
                            content: e.target.value
                        }
                    )} 
                />
                <button className="entry-submit" type="submit">
                    {editingId ? "Update" : "Add" } Entry
                </button>
            </form>

            <ul className="entry-list">
                {entries.map((entry) => (
                    <li className="entry-item" key={entry.id}>
                        <h4 className="entry-title">{entry.title}</h4>
                        <p className="entry-content">{entry.content}</p>
                        <small className="entry-date">{new Date(entry.date).toLocaleString()}</small>
                        <div className="entry-actions">
                        <button 
                            className="entry-edit"
                            onClick={
                                () => startEdit(entry)
                            }
                        >
                            Edit
                        </button>
                        <button 
                            className="entry-delete"
                            onClick={
                                () => deleteEntry(entry.id)
                            }
                        >
                            Delete
                        </button>
                        <button 
                            className="entry-logout"
                            onClick={logout} 
                            //style={{ float: 'right' }}
                        >
                            Logout
                        </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}
export default JournalPage;