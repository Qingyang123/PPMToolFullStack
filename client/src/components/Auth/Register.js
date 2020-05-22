import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import { register } from '../../action/authActions';


class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			fullname: "",
			password: "",
			confirmPassword: "",
			errors: {}
		}
	}

	componentDidMount() {
        if (this.props.auth.validToken) {
            this.props.history.push("/dashboard");
        }
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	onChangeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmitHandler = e => {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
			fullname: this.state.fullname,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};

		this.props.register(newUser, this.props.history);
	}

    render() {
		const { username, fullname, password, confirmPassword, errors } = this.state;

        return (
            <div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your Account</p>
							<form onSubmit={this.onSubmitHandler}>
								<div className="form-group">
									<input type="text" placeholder="Fullname"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.fullname
										})}
										name="fullname"
										value={fullname}
										onChange={this.onChangeHandler}/>
									{errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
								</div>

								<div className="form-group">
									<input type="text" placeholder="Email Address (Username)" 
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.username || errors.UsernameAlreadyExists
										})} 
										name="username"
										value={username}
										onChange={this.onChangeHandler} />
									{(errors.username || errors.UsernameAlreadyExists) && <div className="invalid-feedback">{errors.username || errors.UsernameAlreadyExists}</div>}
								</div>

								<div className="form-group">
									<input type="password" placeholder="Password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.password
										})}
										name="password"
										value={password}
										onChange={this.onChangeHandler}/>
									{errors.password && <div className="invalid-feedback">{errors.password}</div>}
								</div>

								<div className="form-group">
									<input type="password" placeholder="Confirm Password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.confirmPassword
										})} 
										name="confirmPassword"
										value={confirmPassword}
										onChange={this.onChangeHandler}/>
									{errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
								</div>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

Register.propTypes = {
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
})
  

export default connect(
	mapStateToProps,
	{ register }
)(Register);