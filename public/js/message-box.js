import React from 'react'
import ReactDOM from 'react-dom'

import '../css/'

class MessageBox extends React.Component {

    render() {
        return (
            <div className="message-box"> 
                <div className="user-pic" />
                <div className="text-message" /> 
            </div>
        );
    }
}