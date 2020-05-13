package com.qingyang.ppmtool.exceptions;

public class ProjectIdExceptionResponse {
    private String projectIdentifierMsg;

    public ProjectIdExceptionResponse(String projectIdentifierMsg) {
        this.projectIdentifierMsg = projectIdentifierMsg;
    }

    public String getProjectIdentifierMsg() {
        return projectIdentifierMsg;
    }

    public void setProjectIdentifierMsg(String projectIdentifierMsg) {
        this.projectIdentifierMsg = projectIdentifierMsg;
    }
}
