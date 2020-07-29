//wrapper for each column, in progress and open
import React from 'react';

const Col = ({children, isOver}) => {
    const classname = isOver ? " highlightColumn" : "";
    return (
        <div className={`statusColumn ${classname}`}>
            {children}
        </div>
    );
};

export default Col;