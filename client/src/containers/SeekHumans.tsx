import * as React from "react";
import SeekerCriterias from "./SeekerCriterias";
import LoginButton from "../presentials/LoginButton";
import AuthUser from "../models/AuthUser";
import {AppState} from "../state/state";
import {connect} from "react-redux";
import {login, logout} from "../actions/authActions";
import Person from "../models/Person";
import {PeopleResult} from "../presentials/PeopleResult";


export interface SeekHumansProps {
    authUser: AuthUser,
    onLogin: () => void,
    onLogout: () => void,
    peopleResult: Person[]
}

export class SeekHumans extends React.Component<SeekHumansProps, undefined> {

    render() {
        return (
            <div>
                <LoginButton authUser={this.props.authUser} onLogin={this.props.onLogin} onLogout={this.props.onLogout} />
                <SeekerCriterias/>
                <p>
                    <PeopleResult people={this.props.peopleResult}/>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {

    return {
        authUser: state.auth.user,
        peopleResult: state.api.searchResultPeople
    };
}
function mapDispatchToProps(dispatch: Function) {

    return {
        onLogin: () => dispatch(login()),
        onLogout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekHumans)