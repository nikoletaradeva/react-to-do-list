import React, { Component } from "react";
import "./Register.css";
import { register } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";

export class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			age: "",
			isRegistered: false,
			errorMessage: "",
		};
	}

	onInputChange = (event) => {
		event.persist();

		this.setState({
			[event.target.name]: event.target.value,
			errorMessage: "",
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		const { isRegistered, ...user } = this.state;
		console.log(user);
		register(user)
			.then(() => {
				this.setState({
					isRegistered: true,
				});
			})
			.catch((err) => this.setState({ errorMessage: err.message }));
	};

	render() {
		return (
			<>
				{this.state.isRegistered && <Redirect to="/login" />}
				<div className="register-wrapper">
					<form className="register-form" onSubmit={this.onSubmit}>
						{this.state.errorMessage && (
							<span className="text-danger">{this.state.errorMessage}</span>
						)}
						<img
							src="https://image.flaticon.com/icons/png/512/2959/2959959.png"
							alt="user"
						/>
						<div className="form-group">
							<label labelfor="name">Name: </label>
							<input
								type="text"
								name="name"
								id="name"
								className="form-control"
								onChange={this.onInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label labelfor="age">Age: </label>
							<input
								type="number"
								name="age"
								id="age"
								className="form-control"
								onChange={this.onInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label labelfor="email">Email: </label>
							<input
								type="email"
								name="email"
								id="email"
								className="form-control"
								onChange={this.onInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label labelfor="password">Password: </label>
							<input
								type="password"
								name="password"
								id="password"
								className="form-control"
								onChange={this.onInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label labelfor="password">Confirm password: </label>
							<input
								type="password"
								name="password"
								id="password"
								className="form-control"
								onChange={this.onInputChange}
								required
							/>
						</div>
						<button className="btn btn-outline-info">Register</button>
						<p className="m-3">
							Already have an account?{" "}
							<Link className="color-letter" to="/login">
								Sign in
							</Link>
						</p>
					</form>
				</div>
			</>
		);
	}
}
