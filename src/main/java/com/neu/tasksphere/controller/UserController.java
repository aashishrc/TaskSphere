package com.neu.tasksphere.controller;

import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.UserRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable(value = "id") Integer id) {
        return userService.getUserProfile(id);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserProfile(@RequestBody UserRequest request) {
        return userService.updateUserProfile(request);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable("id") Integer id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/changeRole")
    public ResponseEntity<ApiResponse> changeUserRole(@RequestBody UserRequest request) {
        return userService.changeUserRole(request);
    }
}