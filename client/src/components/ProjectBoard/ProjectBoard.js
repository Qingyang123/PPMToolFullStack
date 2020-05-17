import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Backlog from './Backlog';
import { getBacklogProjectTasks } from '../../action/backlogActions';

class ProjectBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {}
		}
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.getBacklogProjectTasks(id);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

    render() {
		const { project_tasks, match: { params: { id } } } = this.props;
		const { errors } = this.state;

		let BoardContent;
		const boardLogic = (errors, project_tasks) => {
			if (project_tasks.length < 1) {
				if (errors.projectNotFound) {
					return (
						<div className="alert alert-danger text-center" role="alert">
							{ errors.projectNotFound }
						</div>
					);
				} else {
					return (
						<div className="alert alert-info text-center" role="alert">
							No Project Tasks on this board
						</div>
					)
				}
			} else {
				return <Backlog project_tasks={project_tasks}/>
			}
		}

		BoardContent = boardLogic(errors, project_tasks);

        return (
            <div className="container">
				<Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
					<i className="fas fa-plus-circle"> Create Project Task</i>
				</Link>
				<br />
				<hr />
				{BoardContent}
			</div>
        )
    }
}

ProjectBoard.propTypes = {
	project_tasks: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired,
	getBacklogProjectTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	project_tasks: state.backlog.project_tasks,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ getBacklogProjectTasks }
)(ProjectBoard);