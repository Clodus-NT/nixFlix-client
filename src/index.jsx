import React from 'react';
import ReactDOM from 'react-dom';

//Bundles .index.scss
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good Morning</div>
            </div>
        );
    }
}

//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
