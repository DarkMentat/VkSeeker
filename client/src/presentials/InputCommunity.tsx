import * as React from "react";
import FormEvent = React.FormEvent;


export interface InputCommunityProps {

    onInputCommunity: (name:string) => void;
}
export interface InputCommunityState {

    text: string;
}

export class InputCommunity extends React.Component<InputCommunityProps, InputCommunityState> {

    constructor(props: InputCommunityProps) {
        super(props);

        this.state = { text: "" }
    }


    onTextChange(e: FormEvent<HTMLInputElement>) {
        this.setState({ ...this.state, text: e.currentTarget.value });
    }
    onInputCommunity(e: FormEvent<HTMLButtonElement|HTMLFormElement>) {
        e.preventDefault();

        this.props.onInputCommunity(this.state.text);
        this.setState({ ...this.state, text: ""});
    }


    render() {
        return (
            <form onSubmit={(e) => this.onInputCommunity(e) } >
                <input type="text" placeholder="Community" value={this.state.text} onChange={ e => this.onTextChange(e) }/>
                <button onClick={(e) => this.onInputCommunity(e) } >+</button>
            </form>
        );
    }
}