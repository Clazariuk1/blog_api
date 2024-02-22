import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    const signUp = async (credentials) => {
        try {
           const response  =  await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
           })
           const data = await response.json()
           setUser(data.user)
           setToken(data.token)
           localStorage.setItem('token', data.token)
        } catch (error) {
           console.error(error)
        }
    }

    return(
        <div className={styles.App}>
            <Routes>
                <Route path="/" element={<HomePage user={user} token={token} setToken={setToken}/>}></Route>
                <Route path="/register" element={<AuthPage setUser={setUser} setToken={setToken} signUp={signUp}/>}></Route>
                <Route path="/blog" element={<ShowPage user={user} token={token} setToken={setToken}/>}></Route>
            </Routes>
        </div>
    )
}
