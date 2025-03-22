import React, { ReactNode } from 'react';
interface WrapComponentProps {
    action?: ReactNode,
    filter?: ReactNode
}

const WrapComponent: React.FC<WrapComponentProps> = ({action, filter}) => {
    return <div className="flex justify-between mb-2">
        {filter}
        {action}
    </div>
}

export default WrapComponent
