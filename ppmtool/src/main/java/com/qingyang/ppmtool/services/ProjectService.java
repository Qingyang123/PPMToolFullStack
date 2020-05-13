package com.qingyang.ppmtool.services;

import com.qingyang.ppmtool.domain.Project;
import com.qingyang.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        return projectRepository.save(project);
    }
}
