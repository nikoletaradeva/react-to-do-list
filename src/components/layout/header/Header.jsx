import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { logout } from "../../../core/api/users.api";
import "./Header.css";

export const Header = withRouter((props) => {
	console.log("HEADER PROPS +>", props);
	const [isLoggedOut, setLogoutFlag] = useState(false);
	const [searchParam, setSearchParam] = useState("");

	const onLogout = () => {
		logout();
		setLogoutFlag(true);
	};

	const onSearchChange = (event) => {
		event.persist();
		setSearchParam(event.target.value);
	};

	const onSearchClick = (event) => {
		event.preventDefault();
		const pathNameUrl = props.location.pathname.substr(1);

		const historyObj = { pathname: `/${pathNameUrl}` };
		if (searchParam) {
			historyObj["search"] = `?q=${searchParam}`;
		}

		props.history.push(historyObj);
	};

	return (
		<>
			{isLoggedOut && <Redirect to="/login" />}
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a className="navbar-brand" href="/">
					
					<img className=" img-logo" src="https://pngimage.net/wp-content/uploads/2018/06/to-do-list-png-5.png" alt="task"/>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item ">
							<Link to="/users" className="nav-link">
								Users
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/users/create" className="nav-link">
								Create user
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/tasks" className="nav-link">
								All tasks
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/tasks/my-tasks" className="nav-link">
								My tasks
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/tasks/create" className="nav-link">
								Create task
							</Link>
						</li>
					</ul>
					
					<form className="form-inline my-2 my-lg-0" onSubmit={onSearchClick}>
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							onChange={onSearchChange}
						/>
						<button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
					</form>
					<span className="logout-btn btn btn-outline-info my-2 my-sm-0" onClick={onLogout}> Logout </span>
				</div>
			</nav>
		</>
	);
});
