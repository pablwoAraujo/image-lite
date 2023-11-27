package com.github.pablwoaraujo.imageliteapi.application.users;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pablwoaraujo.imageliteapi.domain.AccessToken;
import com.github.pablwoaraujo.imageliteapi.domain.entity.User;
import com.github.pablwoaraujo.imageliteapi.domain.exception.DuplicatedTupleException;
import com.github.pablwoaraujo.imageliteapi.domain.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDTO dto) {
        try {
            User user = userMapper.mapToUser(dto);
            userService.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException e) {
            Map<String, String> result = Map.of("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity authenticate(@RequestBody CredentialsDTO credentials) {
        AccessToken token = userService.authenticate(credentials.getEmail(), credentials.getPassword());

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(token);
    }

}
