import * as React from "react";
import Person from "../models/Person";
import {PersonEntry} from "./PersonEntry";

export interface PeopleResultProps {

    people: Person[]
}
export class PeopleResult extends React.Component<PeopleResultProps, undefined> {

    render() {
        return (
            <div>
                { this.props.people.map(p => <div key={p.id}><PersonEntry person={p} /></div>) }
            </div>
        );
    }
}