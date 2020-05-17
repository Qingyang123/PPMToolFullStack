import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Backlog from './Backlog';
import { getBacklogProjectTasks } from '../../action/backlogActions';

class ProjectBoard extends Component {

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.getBacklogProjectTasks(id);
	}

    render() {
		const { project_tasks, match: { params: { id } } } = this.props;

        return (
            <div className="container">
				<Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
					<i className="fas fa-plus-circle"> Create Project Task</i>
				</Link>
				<br />
				<hr />
			
				<Backlog project_tasks={project_tasks}/>
			</div>
        )
    }
}

ProjectBoard.propTypes = {
	project_tasks: PropTypes.array.isRequired,
	getBacklogProjectTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	project_tasks: state.backlog.project_tasks
})

export default connect(
	mapStateToProps,
	{ getBacklogProjectTasks }
)(ProjectBoard);