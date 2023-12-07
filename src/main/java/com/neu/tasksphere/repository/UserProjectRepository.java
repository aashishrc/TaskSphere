package com.neu.tasksphere.repository;

import com.neu.tasksphere.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, UserProject.UserProjectId> {

}
