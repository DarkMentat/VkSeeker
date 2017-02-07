import * as React from "react";
import Person from "../models/Person";

export interface PersonEntryProps {

    person: Person
}
export class PersonEntry extends React.Component<PersonEntryProps, undefined> {


    render() {
        return (
            <div>
                <a href={"https://vk.com/id"+this.props.person.id}>
                    <p> {this.props.person.firstName + " " + this.props.person.lastName} </p>
                    <img src={ this.props.person.photoUrl200 }/>
                </a>
                <hr/>
            </div>
        );
    }
}