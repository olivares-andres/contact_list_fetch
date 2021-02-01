import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-light bg-light mb-3 navColor">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contact List 4geeks</span>
				</Link>
				<div className="ml-auto"></div>
			</nav>
		);
	}
}
