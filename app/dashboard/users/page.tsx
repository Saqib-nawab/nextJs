import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <div>
            <div>Dashbaord Users</div>
            <li><Link href="users/1" >user 1</Link></li>
            <li><Link href="users/2" >user 2</Link></li>
            <li><Link href="users/3" >user 3</Link></li>
            <li><Link href="users/4" >user 4</Link></li>
        </div>
    )
}

export default page