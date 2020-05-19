package com.qingyang.ppmtool.services;

import com.qingyang.ppmtool.domain.User;
import com.qingyang.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.qingyang.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {

        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));   // Encode user password
            newUser.setUsername(newUser.getUsername());   // Username must be unique
            newUser.setConfirmPassword("");    // ConfirmPassword does not persist
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

//        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
//        User user = userRepository.findByUsername(newUser.getUsername());
//        if (user != null) {
//            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
//        }
//        return userRepository.save(newUser);
    }
}
