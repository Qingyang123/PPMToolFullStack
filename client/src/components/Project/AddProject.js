import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createProject } from '../../action/projectAction';

class AddProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
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
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };

        this.props.createProject(newProject, this.props.history)
    }

    render() {
        const { projectName, projectIdentifier, description, start_date, end_date, errors } = this.state;
        return (
            <div>
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" 
                                        className={classnames("form-control form-control-lg ",  {
                                            "is-invalid": errors.projectName
                                        })} 
                                        placeholder="Project Name"
                                        name='projectName'
                                        value={projectName}
                                        onChange={this.onChangeHandler}/>
                                    { errors.projectName &&  <p className='invalid-feedback'>{ errors.projectName }</p> }
                                </div>

                                <div className="form-group">
                                    <input type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectIdentifier
                                        })} 
                                        placeholder="Unique Project ID"
                                        name='projectIdentifier'
                                        value={projectIdentifier}
                                        onChange={this.onChangeHandler}/>
                                    { errors.projectIdentifier &&  <p className='invalid-feedback'>{ errors.projectIdentifier }</p> }
                                </div>

                                <div className="form-group">
                                    <textarea 
                                        className={classnames("form-control form-control-lg" , {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Project Description"
                                        name='description'
                                        value={description}
                                        onChange={this.onChangeHandler}/>
                                    { errors.description &&  <p className='invalid-feedback'>{ errors.description }</p> }
                                </div>

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg"
                                        name='start_date'
                                        value={start_date}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg"
                                        name='end_date'
                                        value={end_date}
                                        onChange={this.onChangeHandler}/>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createProject }
)(AddProject);