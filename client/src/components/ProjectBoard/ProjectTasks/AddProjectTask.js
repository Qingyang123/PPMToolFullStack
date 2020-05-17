import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import { addProjectTask } from '../../../action/backlogActions';

class AddProjectTask extends Component {

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = e => {
        e.preventDefault();
        const newTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        }

        this.props.addProjectTask(this.state.projectIdentifier, newTask, this.props.history);
    }

    render() {
        const { id } = this.props.match.params;
        const { summary, acceptanceCriteria, status, priority, dueDate, errors } = this.state;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${id}`} className="btn btn-light">Back to Project Board</Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" placeholder="Project Task summary"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.summary
                                        })} 
                                        name="summary"
                                        value={summary}
                                        onChange={this.onChangeHandler}/>
                                    { errors.summary && <div className="invalid-feedback">{errors.summary}</div> }
                                </div>

                                <div className="form-group">
                                    <textarea placeholder="Acceptance Criteria"
                                        className="form-control form-control-lg"
                                        name="acceptanceCriteria"
                                        value={acceptanceCriteria}
                                        onChange={this.onChangeHandler}></textarea>
                                </div>

                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" 
                                        className="form-control form-control-lg" 
                                        name="dueDate"
                                        value={dueDate}
                                        onChange={this.onChangeHandler}/>
                                </div>

                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"
                                        value={priority}
                                        onChange={this.onChangeHandler}>

                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="status"
                                        value={status}
                                        onChange={this.onChangeHandler}>

                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { addProjectTask }
)(AddProjectTask);