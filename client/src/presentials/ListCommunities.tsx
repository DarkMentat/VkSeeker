import * as React from "react";


export interface ListCommunitiesProps {

    communities: string[]
}

export class ListCommunities extends React.Component<ListCommunitiesProps, undefined> {

    render() {

        return (
            <div>
                { this.props.communities.map(c => <div key={c}>{c}</div>) }
            </div>
        );
    }
}