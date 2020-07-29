import React, {Fragment, useState, useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {item_type} from "./Item_Type";

const Item = (props) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: item_type,
        drop(item, monitor) {
            debugger
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;// this index is index on hovered item- task index i think
            debugger
            if (dragIndex === hoverIndex) {// if we hover on the same task, we dont want to change nothing
                return;
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            props.moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {// if we hover on the same task, we dont want to change nothing
                return;
            }
            debugger
            props.moveItem(dragIndex, hoverIndex);
        },
    });

    const [collectedProps, drag] = useDrag({
        item: {type: item_type, ...props.item, index: props.index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    drag(drop(ref));
    return (
        <Fragment>
            <div ref={ref}
                 style={{opacity: collectedProps.isDragging ? 0 : 1}}
                 className="item">
                <div className="item-title">{props.item.text}</div>
            </div>
        </Fragment>
    );
};

export default Item;