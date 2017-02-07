import AuthUser from "../models/AuthUser";
import AuthSession from "../models/AuthSession";
import Person from "../models/Person";
export interface AppState {

    auth: AuthState,
    api: ApiState,
}

export interface ApiState {

    searchResultPeople: Person[]
}

export interface AuthState {

    isLoggedIn: boolean

    user?: AuthUser,
    session?: AuthSession
}