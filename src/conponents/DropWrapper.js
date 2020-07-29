// this component introduce each column:, "open", "in progress"
import React, {Fragment, useState, useRef} from 'react';
import {useDrop} from "react-dnd";
import {statuses} from "../data/index";
import {item_type} from "./Item_Type";

const DropWrapper = (props) => {
    const [collectedProps, drop] = useDrop({
        accept: item_type,
        canDrop: (item, monitor) => {// we need to implement that task that is "open", can move only to "in progress", and can not jump directly to "done":
            const itemIndex = statuses.findIndex(si => si === item.status);
            const statusIndex = statuses.findIndex(si => si === props.status);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            debugger
            props.onDrop(item, monitor, props.status)
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <div ref={drop} className="drop-wrapper">
            {React.cloneElement(props.children, {isOver: collectedProps.isOver})}
        </div>
    );
};

export default DropWrapper;