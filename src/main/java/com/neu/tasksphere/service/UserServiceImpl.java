package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.UserRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<UserDTO> getUserProfile(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", id));

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getRole()
        );

        return ResponseEntity.ok(userDTO);
    }

    public ResponseEntity<ApiResponse> updateUserProfile(UserRequest request) {
        User user = userRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getId()));

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "User profile updated successfully"));
    }

    public ResponseEntity<ApiResponse> deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", id));

        userRepository.delete(user);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "You successfully deleted project"));
    }

    public ResponseEntity<ApiResponse> changeUserRole(UserRequest request) {
        User user = userRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getId()));

        user.setRole(request.getRole());
        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "User role changed successfully"));
    }
}
