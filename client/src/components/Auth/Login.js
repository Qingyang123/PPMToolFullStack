import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { login } from '../../action/authActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.validToken) {
            this.props.history.push('/dashboard');
        }
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
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(credentials);
    }

    render() {
        
        const { username, password, errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" placeholder="Email Address (Username)"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })} 
                                        name="username"
                                        value={username}
                                        onChange={this.onChangeHandler}/>
                                    { errors.username && <div className="invalid-feedback">{errors.username}</div> }
                                </div>

                                <div className="form-group">
                                    <input type="password" placeholder="Password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })} 
                                        name="password"
                                        value={password}
                                        onChange={this.onChangeHandler}/>
                                    { errors.password && <div className="invalid-feedback">{errors.password}</div> }
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors 
})

export default connect(
    mapStateToProps,
    { login }
)(Login);