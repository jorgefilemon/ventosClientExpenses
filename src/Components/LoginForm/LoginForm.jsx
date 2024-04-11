import style from "./LoginForm.module.css"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";


import { useRef, useEffect, useState, useContext } from 'react'


const LoginForm = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const { auth, setAuth } = useContext(AuthContext)

    // console.log('login', auth)

    const navigate = useNavigate();
    const refInput = useRef();

    useEffect(() => {
        refInput.current.focus()
    }, []);


    // submit // login authenticate 
    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/login", {
            userName: userName,
            password: password,
        }, { withCredentials: true }).then(({ data }) => {
            if (data.message) {
                setErrorMessage(data.message)
            } else {
                setAuth({ ...auth, logged: data.logged });
                navigate("/")
            }
        }
        )
    };

    return (
        <div className={style.formContainer}>
            <div className={style.logo}><p>Lolita</p></div>
            <div className={style.loginForm}>

                <form onSubmit={handleSubmit} >
                    <input
                        id='username'
                        onChange={e => setUserName(e.target.value)}
                        ref={refInput}
                        type="text"
                        placeholder="Usuario"
                        autoComplete='off'
                    />

                    <input
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="off"
                    />
                    <div className={style.auth}>
                        <p>{errorMessage}</p>
                    </div>
                    <button type='submit'>Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;