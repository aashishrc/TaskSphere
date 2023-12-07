package com.neu.tasksphere.service;

import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface UserProjectService {
    ResponseEntity<ApiResponse> assignProject(ProjectRequest request);
}
