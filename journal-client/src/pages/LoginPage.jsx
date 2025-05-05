import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' })
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        try {
            const res = await API.post(endpoint, form);
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                navigate('/journal');
            } else {
                alert('Registered! Now Login.');
                setIsLogin(true);
            }
        } catch {
            alert(isLogin ? 'Login failed' : 'Registration failed')
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
            <input
                className="auth-input" 
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm(
                    { 
                        ...form,
                        username: e.target.value
                    }
                )} 
            />
            <input 
                className="auth-input"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm(
                    { 
                        ...form,
                        password: e.target.value
                    }
                )} 
            />
            <button className="auth-button" type="submit">
                {isLogin ? 'Login' : 'Register'}
            </button>
            <p 
                className="auth-toggle"
                //style={{ cursor: 'pointer', color: 'blue' }} 
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? "Don't have an account yet? Register" : "Already have an account? Login"}
            </p>
        </form>
    );
}

export default LoginPage;