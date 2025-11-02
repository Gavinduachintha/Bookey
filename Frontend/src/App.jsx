import React from 'react'
import './css/App.css'
import {Card} from "./Card.jsx";
import {Form} from "./Form.jsx";
import { CirclePlus} from 'lucide-react';
function App() {

  return (
    <>
    <Card
        title="Beautiful Landscape"
        description="A breathtaking view of mountains during sunset."
        url="https://i.pinimg.com/236x/ee/4f/b1/ee4fb15c83d22e0a428fc37127191346.jpg"/>
      <div className="add-button">
        <CirclePlus/>
      </div>
      <Form/>
    </>

  )
}

export default App
