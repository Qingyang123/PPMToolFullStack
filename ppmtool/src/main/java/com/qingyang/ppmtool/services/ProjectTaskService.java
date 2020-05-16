package com.qingyang.ppmtool.services;

import com.qingyang.ppmtool.domain.Backlog;
import com.qingyang.ppmtool.domain.Project;
import com.qingyang.ppmtool.domain.ProjectTask;
import com.qingyang.ppmtool.repositories.BacklogRepository;
import com.qingyang.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setBacklog(backlog);

        // We want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence ++;
        backlog.setPTSequence(BacklogSequence);

        // Add sequence and projectIdentifier to projectTask
        projectTask.setProjectSequence(backlog.getProjectIdentifier() + '-' + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TODO");
        }

        if (projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask>findBacklogProjectTasks(String projectIdentifier) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}
