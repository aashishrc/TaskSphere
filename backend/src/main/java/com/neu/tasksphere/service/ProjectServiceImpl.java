package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.factory.ProjectFactory;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<ProjectDTO> getProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", id));

        ProjectDTO projectDTO = new ProjectDTO(project.getId(), project.getName(), project.getDescription());

        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<PagedResponse<ProjectDTO>> getAllProjects(int page, int size) {
        List<ProjectDTO> projectDtoList = new ArrayList<>();

        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projects = projectRepository.findAll(pageable);

        for (Project project : projects.getContent()) {
            projectDtoList.add(new ProjectDTO(
                    project.getId(),
                    project.getName(),
                    project.getDescription()
            ));
        }

        return ResponseEntity.ok(new PagedResponse<>(
                projectDtoList,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isLast())
        );
    }

    public ResponseEntity<ProjectDTO> createProject(ProjectRequest request) {
//        if (category.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
//                .contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
//            category.setName(newCategory.getName());
//            Category updatedCategory = categoryRepository.save(category);
//            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
//        }

        ProjectFactory projectFactory = ProjectFactory.getInstance();
        Project project = projectFactory.createProject(request.getName(), request.getDescription());

        projectRepository.save(project);

        ProjectDTO projectDTO = new ProjectDTO(project.getId(), project.getName(), project.getDescription());

        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<ProjectDTO> updateProject(ProjectRequest request) {
        Project project = projectRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", request.getId()));

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        projectRepository.save(project);

        ProjectDTO projectDTO = new ProjectDTO(project.getId(), project.getName(), project.getDescription());

        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<ApiResponse> deleteProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", id));

        projectRepository.delete(project);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Project deleted successfully"));
    }
}
