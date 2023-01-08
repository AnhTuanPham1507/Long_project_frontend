import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { protectedAPI } from '../api/axios';

function useProtectedAction(permissions) {
    const [grantedPermissions, setGrantedPermissions] = useState(null)
    const { token } = useSelector(state => {
        return {
            token: state.token.value
        }
    })

    useEffect(() => {
        async function checkPermissions() {
            try {
                const qPermissions = permissions.reduce((q,item)=> `${q}permissions[]=${item}&`,"")
                const res = await protectedAPI.checkAction(token, qPermissions)
                setGrantedPermissions(res.data)
            } catch (error) {
                if (axios.isAxiosError(error))
                    alert((error.response ? error.response.data.message : error.message));
                else alert((error.toString()));
            }
        }
        checkPermissions()
    }, [token, permissions])
    return grantedPermissions
}

export default useProtectedAction;