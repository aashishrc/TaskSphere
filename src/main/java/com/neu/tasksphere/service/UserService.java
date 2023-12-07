package com.neu.tasksphere.service;

import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.UserRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<UserDTO> getUserProfile(Integer id);

    ResponseEntity<ApiResponse> updateUserProfile(UserRequest request);

    ResponseEntity<ApiResponse> deleteUser(Integer id);

    ResponseEntity<ApiResponse> changeUserRole(UserRequest request);
}