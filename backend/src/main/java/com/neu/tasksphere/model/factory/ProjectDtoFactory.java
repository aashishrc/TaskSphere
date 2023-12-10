package com.neu.tasksphere.model.factory;

import com.neu.tasksphere.entity.enums.Role;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.UserDTO;

public class ProjectDtoFactory {
    private static ProjectDtoFactory instance = null;
    private ProjectDtoFactory(){

    }

    public static synchronized ProjectDtoFactory getInstance(){
        if(instance == null){
            instance = new ProjectDtoFactory();
        }
        return instance;
    }

    public ProjectDTO createProjectDto(Integer id, String name, String description){
        return new ProjectDTO(id, name, description);
    }
}
