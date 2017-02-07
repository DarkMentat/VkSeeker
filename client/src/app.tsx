import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import vkSeeker from "./reducers";
import SeekHumans from "./containers/SeekHumans";
const thunk: any = require('redux-thunk').default;

declare let module: any;
declare let require: any;

if (module.hot) {
    module.hot.accept();
}

function configureStore() {
  const store = createStore(vkSeeker, applyMiddleware(thunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}



let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <SeekHumans/>
    </Provider>,
    document.getElementById("reactRoot")
);


