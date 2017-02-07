import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import vkSeeker from "./reducers";
import SeekHumans from "./containers/SeekHumans";
const thunk: any = require('redux-thunk').default;

declare let require: any;


let store = createStore(vkSeeker, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <SeekHumans />
    </Provider>,
    document.getElementById("reactRoot")
);
