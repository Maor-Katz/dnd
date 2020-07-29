import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import List from "./conponents/List";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>

            <header className="App-header">
                <div className="App">
                    <List/>
                </div>
            </header>

        </DndProvider>
    );
}

export default App;
