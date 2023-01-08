import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { protectedAPI } from "../api/axios"

function ProtectedRoute(props) {
    const { children } = props
    const [isAuthor, setIsAuthor] = useState(false)
    const token = useSelector(state => state.token.value)
    const navigate = useNavigate()
    useEffect(() => {
        async function checkRoute() {
            try {
                const res = await protectedAPI.checkRoute(token)
                setIsAuthor(true)
            } catch (error) {
                console.log(error)
                if (axios.isAxiosError(error))
                    alert((error.response ? error.response.data : error.message));
                else
                    alert((error.toString()));
                navigate("/login")
            }
        }
        checkRoute()
    }, [children])

    return (
        isAuthor && children
    );
}

export default ProtectedRoute;