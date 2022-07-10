
import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
=======
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux'; //redux recommended using configureStore but error pops up when swapped from createStore
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';
>>>>>>> Stashed changes

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
<<<<<<< Updated upstream
      <Container>
        <MainView />
      </Container>
=======
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
>>>>>>> Stashed changes
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
