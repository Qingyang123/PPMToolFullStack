package com.qingyang.ppmtool.services;

import com.qingyang.ppmtool.domain.Backlog;
import com.qingyang.ppmtool.domain.Project;
import com.qingyang.ppmtool.domain.ProjectTask;
import com.qingyang.ppmtool.exceptions.ProjectNotFoundException;
import com.qingyang.ppmtool.repositories.BacklogRepository;
import com.qingyang.ppmtool.repositories.ProjectRepository;
import com.qingyang.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectTask.setBacklog(backlog);

        // We want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence ++;
        backlog.setPTSequence(BacklogSequence);

        // Add sequence and projectIdentifier to projectTask
        projectTask.setProjectSequence(backlog.getProjectIdentifier() + '-' + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        System.out.println(projectTask.toString());
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TODO");
        }

        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        return projectTaskRepository.save(projectTask);

    }


    public Iterable<ProjectTask>findBacklogProjectTasks(String projectIdentifier, String username) {
        projectService.findProjectByIdentifier(projectIdentifier, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }


    public ProjectTask findPTByProjectSequence(String projectIdentifier, String projectSequence, String username) {
        // make sure we are searching on an existing backlog
        projectService.findProjectByIdentifier(projectIdentifier, username);

        // make sure task with projectSequence exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + projectSequence + "' not found");
        }

        // make sure the projectTask corresponds to the backlog
        if (!projectTask.getProjectIdentifier().equals(projectIdentifier)) {
            throw new ProjectNotFoundException("Project Task '" + projectSequence+"' does not exist in project: '" + projectIdentifier);
        }
        return projectTask;
    }


    public ProjectTask updatePTByProjectSequence(ProjectTask updatedTask, String projectIdentifier, String projectSequence, String username) {
        ProjectTask projectTask = findPTByProjectSequence(projectIdentifier, projectSequence, username);
        projectTask = updatedTask;
        return projectTaskRepository.save(projectTask);
    }


    public void deletePTByProjectSequence(String projectIdentifier, String projectSequence, String username) {
        ProjectTask projectTask = findPTByProjectSequence(projectIdentifier, projectSequence, username);
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        List<ProjectTask> pts = backlog.getProjectTasks();
        pts.remove(projectTask);
        backlog.setProjectTasks(pts);
        backlog.setPTSequence(pts.size());
        backlogRepository.save(backlog);
        projectTaskRepository.delete(projectTask);
    }
}
