package com.github.pablwoaraujo.imageliteapi.application.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pablwoaraujo.imageliteapi.application.jwt.JwtService;
import com.github.pablwoaraujo.imageliteapi.domain.AccessToken;
import com.github.pablwoaraujo.imageliteapi.domain.entity.User;
import com.github.pablwoaraujo.imageliteapi.domain.exception.DuplicatedTupleException;
import com.github.pablwoaraujo.imageliteapi.domain.service.UserService;
import com.github.pablwoaraujo.imageliteapi.infra.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
        User possibleUser = getByEmail(user.getEmail());

        if (possibleUser != null) {
            throw new DuplicatedTupleException("User already exists!");
        }

        encodePassword(user);
        return repository.save(user);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        User user = getByEmail(email);

        if (user == null) {
            return null;
        }

        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (matches) {
            return jwtService.generateToken(user);
        }

        return null;
    }

    private void encodePassword(User user) {
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);

        user.setPassword(encodedPassword);
    }

}