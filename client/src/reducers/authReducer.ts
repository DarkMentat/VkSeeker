import {Action} from "../actions/action";
import {LoginSuccessAction, LoginFailAction, LogoutAction} from "../actions/authActions";
import {AuthState} from "../state/state";


const initState: AuthState = {
    isLoggedIn: false
};

export default function authReducer(state: AuthState = initState, action: Action): AuthState {

    if(LoginSuccessAction.typeOf(action)) {

        return {...state, isLoggedIn: true, user: action.user, session: action.session }
    }

    if(LoginFailAction.typeOf(action)) {

        return {...state, isLoggedIn: false, user: null, session: null }
    }

    if(LogoutAction.typeOf(action)) {

        return {...state, isLoggedIn: false, user: null, session: null }
    }

    return state;
}
