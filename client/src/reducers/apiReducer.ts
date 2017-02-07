import {Action} from "../actions/action";
import {SeekHumansAction, SeekHumansSuccessAction, SeekHumansFailAction} from "../actions/apiActions";
import {ApiState} from "../state/state";


export default function apiReducer(state: ApiState = {searchResultPeople: []}, action: Action): ApiState {

    if (SeekHumansAction.typeOf(action)) {

    }

    if (SeekHumansSuccessAction.typeOf(action)) {

        return {...state, searchResultPeople: action.people}
    }

    if (SeekHumansFailAction.typeOf(action)) {

        alert("error while seeking humans");
        return {...state, searchResultPeople: []}
    }

    return state;
}
