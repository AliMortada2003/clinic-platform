import React from 'react'
import { useAuth } from '../../../hocks/useAuth'

function AdminProfilePage() {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>AdminProfilePage</div>
    )
}

export default AdminProfilePage