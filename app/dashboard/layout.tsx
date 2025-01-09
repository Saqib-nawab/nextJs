import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>layout</div>
            {children}
        </div>
    )
}
export default layout