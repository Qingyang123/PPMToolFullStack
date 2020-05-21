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

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.validToken) {
            this.props.history.push('/dashboard');
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
                                        className="form-control form-control-lg" 
                                        name="username"
                                        value={username}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Password"
                                        className="form-control form-control-lg" 
                                        name="password"
                                        value={password}
                                        onChange={this.onChangeHandler}/>
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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors 
})

export default connect(
    mapStateToProps,
    { login }
)(Login);