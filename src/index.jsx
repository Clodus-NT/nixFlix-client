import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

//Bundles index.scss
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
