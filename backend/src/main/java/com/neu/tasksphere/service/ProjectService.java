package com.neu.tasksphere.service;

import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import org.springframework.http.ResponseEntity;

public interface ProjectService {
    ResponseEntity<ProjectDTO> getProject(Integer id);

    ResponseEntity<PagedResponse<ProjectDTO>> getAllProjects(int page, int size);

    ResponseEntity<ProjectDTO> createProject(ProjectRequest request);

    ResponseEntity<ProjectDTO> updateProject(ProjectRequest request);

    ResponseEntity<ApiResponse> deleteProject(Integer id);
}
