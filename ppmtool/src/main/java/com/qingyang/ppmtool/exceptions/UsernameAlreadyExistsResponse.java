package com.qingyang.ppmtool.exceptions;

public class UsernameAlreadyExistsResponse {

    public String UsernameAlreadyExists;

    public UsernameAlreadyExistsResponse(String UsernameAlreadyExists) {
        this.UsernameAlreadyExists = UsernameAlreadyExists;
    }

    public String getUsernameAlreadyExists() {
        return UsernameAlreadyExists;
    }

    public void setUsernameAlreadyExists(String usernameAlreadyExists) {
        UsernameAlreadyExists = usernameAlreadyExists;
    }
}
