package com.qingyang.ppmtool.web;

import com.qingyang.ppmtool.domain.ProjectTask;
import com.qingyang.ppmtool.services.MapValidationErrorService;
import com.qingyang.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{projectIdentifier}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result,
                                            @PathVariable String projectIdentifier) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask savedProjectTask = projectTaskService.addProjectTask(projectIdentifier, projectTask);
        return new ResponseEntity<ProjectTask>(savedProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public Iterable<ProjectTask> getBacklogPTs(@PathVariable String projectIdentifier) {
        return projectTaskService.findBacklogProjectTasks(projectIdentifier);
    }

    @GetMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<ProjectTask> getProjectTask(@PathVariable String projectIdentifier, @PathVariable String projectSequence) {
        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(projectIdentifier, projectSequence);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,
                                                         BindingResult result,
                                                         @PathVariable String projectIdentifier,
                                                         @PathVariable String projectSequence) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask updatedTask = projectTaskService.updatePTByProjectSequence(projectTask, projectIdentifier, projectSequence);
        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String projectIdentifier, @PathVariable String projectSequence) {
        projectTaskService.deletePTByProjectSequence(projectIdentifier, projectSequence);
        return new ResponseEntity<String>("Project Task "+projectSequence+" was deleted successfully", HttpStatus.OK);
    }
}
