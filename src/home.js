import React from 'react';
import ReactDOM from 'react-dom';

class ReactApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name
        };
    }

    render(){
        return (
            <div>
                <h1>this is just test react app for {this.state.name}</h1>
            </div>
        );
    }
}


ReactDOM.render(<ReactApp name="zubair"/>,document.getElementById("reactApp"));