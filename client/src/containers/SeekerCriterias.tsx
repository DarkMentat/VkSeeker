import * as React from "react";
import {ListCommunities} from "../presentials/ListCommunities";
import {InputCommunity} from "../presentials/InputCommunity";
import {InputKeyCriterias} from "../presentials/InputKeyCriterias";
import {SearchButton} from "../presentials/SearchButton";
import {connect} from "react-redux";
import AuthSession from "../models/AuthSession";
import {AppState} from "../state/state";
import KeyCriteriaPack from "../models/KeyCriteriaPack";
import {seekHumans} from "../actions/apiActions";
import {PeopleResult} from "../presentials/PeopleResult";
import Person from "../models/Person";


export interface SeekerCriteriasProps {
    isLoggedIn: boolean,
    authSession: AuthSession,
    onSearch: (communities: string[], criterias: KeyCriteriaPack, session: AuthSession) => void,

}
export interface SeekerCriteriasState {

    communities: string[];
    keyCriterias: KeyCriteriaPack;
}

export class SeekerCriterias extends React.Component<SeekerCriteriasProps, SeekerCriteriasState> {

    constructor(props: any) {
        super(props);

        this.state = { communities: [], keyCriterias: new KeyCriteriaPack() }
    }


    render() {
        return (
            <div>
                <p>
                    <InputCommunity onInputCommunity={ c => this.setState({...this.state, communities: [...this.state.communities, c]}) }/>
                    <ListCommunities communities={ this.state.communities }/>
                </p>
                <InputKeyCriterias criterias={ this.state.keyCriterias } onUpdate={ (pack) => this.setState({...this.state, keyCriterias: pack})}/>
                { this.props.isLoggedIn && <SearchButton onClick={ () => this.props.onSearch(this.state.communities, this.state.keyCriterias, this.props.authSession) }/> }
            </div>
        );
    }
}


function mapStateToProps(state: AppState) {

    return {
        authSession: state.auth.session,
        isLoggedIn: state.auth.isLoggedIn
    };
}
function mapDispatchToProps(dispatch: Function) {

    return {
        onSearch: (communities: string[], criterias: KeyCriteriaPack, session: AuthSession) => dispatch(seekHumans(communities, criterias, session))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerCriterias)