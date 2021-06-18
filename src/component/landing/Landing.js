import React from "react";
import {Link} from "react-router-dom";
import image from "../../content/image/map.png"

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container text-center">
                <img src={image}/>
                <a className={"caption"}>
                    <Link to={'/map'}>Awesome Map</Link>
                </a>
            </div>

        );
    }
}

export default Landing;
