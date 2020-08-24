import React, {Component} from "react";

class Score extends Component {

    constructor(props) {
        super(props);
        console.log("props " + JSON.stringify(this.props));
    }

    render() {
        return (
            <div>
                Score {this.props.details.name}
            </div>
        );
    }
}
export default Score;