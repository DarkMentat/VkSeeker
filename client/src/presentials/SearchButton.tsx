import * as React from "react";
import FormEvent = React.FormEvent;


export interface InputCommunityProps {

    onClick: () => void;
}
export class SearchButton extends React.Component<InputCommunityProps, undefined> {


    render() {
        return (
            <button onClick={ e => this.props.onClick() }>Search</button>
        );
    }
}