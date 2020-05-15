import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../action/projectAction'
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';


class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {

        const { projects } = this.props;
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton/>
                            <br />
                            <hr />
                            {
                                projects.map(project => <ProjectItem key={project.id} project={project} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getProjects: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    projects: state.project.projects
})

export default connect(
    mapStateToProps,
    { getProjects }
)(Dashboard);