import React, {useRef, useState} from 'react';

const List = () => {
    const [list, setList] = useState([
        {
            status: "in progress",
            items: ["poplular thing", "important mission", "goolvier", "MTA good"]
        },
        {
            status: "open",
            items: ["awesome thing", "amazing mission", "incradible", "BTJ good"]
        }
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();
    const handleDragStart = (e, params) => {
        console.log(params)

        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setTimeout(() => {
            setIsDragging(true)
        }, 0)
    };

    const handleDragEnd = () => {
        console.log('ending drag...')
        // dragNode.current.removeEventListener("dragend", handleDragEnd);
        // dragNode.current = null
        dragItem.current = null
        setIsDragging(false);
    }

    const getStyle = (specificItem) => {
        const currentItem = dragItem.current;
        if (specificItem.statusIndex === currentItem.statusIndex && currentItem.itemIndex === specificItem.itemIndex) {
            return "current dnd-item"
        }
        return " dnd-item"
    };

    const handleDragEnter = (e, params) => {
        console.log("entering drag")
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("draggable is not the same target");
            setList(prevState => {
                let newList = JSON.parse(JSON.stringify(prevState))//deep copy of old list array
                newList[params.statusIndex].items.splice(params.itemIndex, 0, newList[currentItem.statusIndex].items.splice(currentItem.itemIndex, 1)[0]);
                dragItem.current = params;
                dragNode.current=null//i added this line
                return newList
            })
        }
    }

    return (
        <div className="List">
            <div className="drag-n-drop">
                {list.map((status, statusIndex) => {
                    return <div className="dnd-group" key={statusIndex}>
                        <h3 className="dnd-title"
                            onDragEnter={isDragging && !status.items.length ? (e) => handleDragEnter(e, {
                                statusIndex,
                                itemIndex: 0
                            }) : null}
                        >{status.status}</h3>
                        {status.items.map((i, itemIndex) => {
                            return <div className={isDragging ? getStyle({statusIndex, itemIndex}) : "dnd-item"}
                                        draggable onDragStart={(e) => handleDragStart(e, {statusIndex, itemIndex})}
                                        key={itemIndex}
                                        onDragEnter={isDragging ? (e) => handleDragEnter(e, {
                                            statusIndex,
                                            itemIndex
                                        }) : null}
                            >{i}</div>
                        })}
                    </div>
                })}
            </div>
        </div>
    );
};

export default List;