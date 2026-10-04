import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("nodeplex_user")

        return savedUser ? JSON.parse(savedUser) : null
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem("nodeplex_token")
    })

    const signin = (data) => {
        localStorage.setItem("nodeplex_token", data.token)
        localStorage.setItem("nodeplex_user", JSON.stringify(data.user))

        setToken(data.token)
        setUser(data.user)
    }

    const signout = () => {
        localStorage.removeItem("nodeplex_token")
        localStorage.removeItem("nodeplex_user")

        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user, token, signin, signout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)