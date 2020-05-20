package com.qingyang.ppmtool.services;

import com.qingyang.ppmtool.domain.Backlog;
import com.qingyang.ppmtool.domain.Project;
import com.qingyang.ppmtool.domain.User;
import com.qingyang.ppmtool.exceptions.ProjectIdException;
import com.qingyang.ppmtool.exceptions.ProjectNotFoundException;
import com.qingyang.ppmtool.repositories.BacklogRepository;
import com.qingyang.ppmtool.repositories.ProjectRepository;
import com.qingyang.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        // Add user authorization to updating a project
        if (project.getId() != null) {
            Project existedProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if (existedProject != null && (!existedProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException("Project not found in your account");
            } else if (existedProject == null) {
                throw new ProjectNotFoundException("Project with ID: '" + project.getProjectIdentifier() + "' cannot be updated because it doesn't exist");
            }
        }
        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            // id == null: creating new project
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            // id != null: updating an existing project
            else if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID " + project.getProjectIdentifier().toUpperCase() + " already exists.");
        }
    }


    public Project findProjectByIdentifier(String projectId, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }


    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
