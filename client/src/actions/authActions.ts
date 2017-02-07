import {Action} from "./action";
import AuthUser from "../models/AuthUser";
import AuthSession from "../models/AuthSession";
declare let VK: any;


export class LogoutAction extends Action {

    static typeOf(action: Action): action is LogoutAction{
        return action.type == "LogoutAction"
    }

    constructor() {
        super("LogoutAction");
    }
}


export class LoginStartAction extends Action {

    static typeOf(action: Action): action is LoginStartAction{
        return action.type == "LoginStartAction"
    }

    constructor() {
        super("LoginStartAction");
    }
}

export class LoginFailAction extends Action {

    static typeOf(action: Action): action is LoginFailAction{
        return action.type == "LoginFailAction"
    }

    constructor() {
        super("LoginFailAction");
    }
}

export class LoginSuccessAction extends Action {

    static typeOf(action: Action): action is LoginSuccessAction{
        return action.type == "LoginSuccessAction"
    }

    user: AuthUser;
    session: AuthSession;


    constructor(user: AuthUser, session: AuthSession) {
        super("LoginSuccessAction");

        this.user = user;
        this.session = session;
    }
}


export function logout() {

    return (dispatch: Function) => {

        VK.Auth.logout(() => dispatch(new LogoutAction().plain()))
    };
}
export function login() {

    return (dispatch: Function) => {

        dispatch(new LoginStartAction().plain());

        VK.Auth.login((response: any) => {

            if (response.session) {

                let clientId = 5808944;
                let redirectUrl = "http://vkseeker-router-vkseeker.44fs.preview.openshiftapps.com/login";

                document.createElement("img").src = "https://oauth.vk.com/authorize?client_id="+clientId+"&display=page&redirect_uri="+redirectUrl+"&response_type=code&v=5.60";

                dispatch(new LoginSuccessAction(

                    new AuthUser(response.session.user.id,
                                 response.session.user.domain,
                                 response.session.user.first_name,
                                 response.session.user.last_name),

                    new AuthSession(response.session.expire,
                                    response.session.mid,
                                    response.session.secret,
                                    response.session.sid,
                                    response.session.sig)

                ).plain());

            } else {
                dispatch(new LoginFailAction().plain());
            }
        })
    };
}
