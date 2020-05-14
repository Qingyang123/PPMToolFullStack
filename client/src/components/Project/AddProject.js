import React, { Component } from 'react';

class AddProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: ""
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
        console.log(newProject);
    }

    render() {
        const { projectName, projectIdentifier, description, start_date, end_date } = this.state;

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
                                    <input type="text" className="form-control form-control-lg " placeholder="Project Name"
                                        name='projectName'
                                        value={projectName}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID" disabled
                                        name='projectIdentifier'
                                        value={projectIdentifier}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Project Description"
                                        name='description'
                                        value={description}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="start_date"
                                        name='start_date'
                                        value={start_date}
                                        onChange={this.onChangeHandler}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="end_date"
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

export default AddProject;