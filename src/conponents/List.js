import React, {useState} from 'react';
import {statuses, items} from '../data/index'
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import Item from "./Item";


const List = () => {
    const [list, setList] = useState(items);

    const onDrop = (item, monitor, status) => {
        debugger
        const mapping = statuses.find(si => si === status);
        setList(prevState => {
            const newItems = prevState.filter(i => i.id !== item.id)
                .concat({...item, status, icon: mapping.icon})
            return [...newItems]
        })
    }
    const moveItem = (dragIndex, hoverIndex) => {
        debugger
        const item = list[dragIndex];
        setList(prevState => {
            const newItems = prevState.filter((i, index) => index !== dragIndex)
            newItems.splice(hoverIndex, 0, item);
            return [...newItems]
        })
    }

    return (
        <div className="wrapper">
            {statuses.map(s => (
                <div className="column-Wrapper" key={s}>
                    <h2>{s.toUpperCase()}</h2>
                    <DropWrapper onDrop={onDrop} status={s}>
                        <Col>
                            {list.filter(i => i.status === s).map((listItem, index) => (
                                <Item key={listItem.id} item={listItem} index={index} moveItem={moveItem} status={s}/>
                            ))}
                        </Col>
                    </DropWrapper>
                </div>
            ))}
        </div>
    );
};

export default List;