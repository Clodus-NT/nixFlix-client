import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

//Bundles index.scss
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Container>
                <MainView />
            </Container>
        );
    }
}

//Finds root of app
const container = document.getElementById('app-container');

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);


// import { createRoot } from "react-dom/client";
// import { MainView } from './components/main-view/main-view';

// //Bundles index.scss
// import './index.scss';

// const container = document.getElementById("app-container")
// const root = createRoot(container)

// root.rendimport React from 'react';er(
//         <React.StrictMode>
//           <MainView />
//         </React.StrictMode>
//  )
