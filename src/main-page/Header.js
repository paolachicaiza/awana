import { Component } from "react";
import logo from "./awana.jpeg"

class Header extends Component {
    render() {
        return (
            <header className="row">
                <div className="col-md-4 mt-1">
                    <img src={logo} className="logo" alt="logo"/>                    
                </div>
                <div className="col-md-4 mt-5 text-center subtitle">
                    {this.props.subtitle}
                </div>
            </header>
        )
    }
}
export default Header;
