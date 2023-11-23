package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.jwt.JwtService;
import com.neu.tasksphere.model.AuthenticationRequest;
import com.neu.tasksphere.model.AuthenticationResponse;
import com.neu.tasksphere.model.RegisterRequest;
import com.neu.tasksphere.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    //    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
//            TokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
//        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getFirstname(),
                request.getLastname(),
                request.getRole());

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

//        saveUserToken(savedUser, jwtToken);

        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
//        revokeAllUserTokens(user);

//        saveUserToken(user, jwtToken);

        return new AuthenticationResponse(jwtToken);
    }

//    private void saveUserToken(User user, String jwtToken) {
//        Token token = new Token(jwtToken, "BEARER", false, false, user);
//        tokenRepository.save(token);
//    }
}
