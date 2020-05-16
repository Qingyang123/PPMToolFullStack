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
                                            @PathVariable String projectIdentifier,
                                            BindingResult result) {
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
}
