import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
    render() {
        return (
             <div>
                <h1> Hello {this.props.name},from React app </h1> 
            </div>
        );
    }
}

ReactDOM.render( <Hello name="zubair" /> , document.getElementById('helloApp'))