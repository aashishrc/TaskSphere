package com.neu.tasksphere.model.factory;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.TaskDTO;

import java.util.Date;

public class TaskDtoFactory {

    private static TaskDtoFactory instance = null;
    private TaskDtoFactory(){

    }

    public static synchronized TaskDtoFactory getInstance(){
        if(instance == null){
            instance = new TaskDtoFactory();
        }
        return instance;
    }

    public TaskDTO createTaskDto(Integer id,
                                 String name,
                                 String description,
                                 Date deadline,
                                 TaskPriority priority,
                                 TaskStatus status){
        return new TaskDTO(id, name, description, deadline, priority, status);
    }
}
