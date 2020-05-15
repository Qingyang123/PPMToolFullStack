import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getProject, createProject } from '../../action/projectAction';

class UpdateProject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: "",
			projectName: "",
			projectIdentifier: "",
			description: "",
			start_date: "",
			end_date: "",
			errors: {}
		}
	}

	componentDidMount() {
		const { history, match: { params: { id } } } = this.props;
		this.props.getProject(id, history);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		const { id, projectName, projectIdentifier, description, start_date, end_date } = nextProps.project;
		this.setState({
			id, projectName, projectIdentifier, description, start_date, end_date
		})
	}

	onChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitHandler = e => {
		e.preventDefault();

		const updateProject = {
			id: this.state.id,
			projectName: this.state.projectName,
			projectIdentifier: this.state.projectIdentifier,
			description: this.state.description,
			start_date: this.state.start_date,
			end_date: this.state.end_date
		};

		this.props.createProject(updateProject, this.props.history);
	}

    render() {

		const { projectName, projectIdentifier, description, start_date, end_date, errors } = this.state;

        return (
            <div className="project">
				<div className="container">
					<div className="row">
					<div className="col-md-8 m-auto">
						<h5 className="display-4 text-center">Update Project form</h5>
						<hr />
						<form onSubmit={this.onSubmitHandler}>
							<div className="form-group">
								<input
									type="text"
									name="projectName"
									value={projectName}
									className={classnames("form-control form-control-lg ", {
										"is-invalid": errors.projectName
									})}
									placeholder="Project Name"
									onChange={this.onChangeHandler} />
								{errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}
							</div>

							<div className="form-group">
								<input
									type="text"
									name="projectIdentifier"
									value={projectIdentifier}
									className="form-control form-control-lg"
									placeholder="Unique Project ID"
									onChange={this.onChangeHandler}
									disabled />
							</div>

							<div className="form-group">
								<textarea
									name="description"
									value={description}
									className={classnames("form-control form-control-lg", {
										"is-invalid": errors.description
									})}
									placeholder="Project Description"
									onChange={this.onChangeHandler} />
								{errors.description && <div className="invalid-feedback">{errors.description}</div>}
							</div>
							
							<h6>Start Date</h6>
							<div className="form-group">
								<input
									type="date"
									className="form-control form-control-lg"
									name="start_date"
									value={start_date}
									onChange={this.onChangeHandler} />
							</div>
							<h6>Estimated End Date</h6>
							<div className="form-group">
								<input
									type="date"
									className="form-control form-control-lg"
									name="end_date"
									value={end_date}
									onChange={this.onChangeHandler} />
							</div>
			
							<input type="submit" className="btn btn-primary btn-block mt-4"/>
						</form>
					</div>
					</div>
				</div>
            </div>
          );
    }
}

UpdateProject.propTypes = {
	getProject: PropTypes.func.isRequired,
	createProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	project: state.project.project,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ getProject, createProject }
)(UpdateProject);