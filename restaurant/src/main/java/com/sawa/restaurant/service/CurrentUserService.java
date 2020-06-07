package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.CurrentUser;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.repository.EmployeeRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CurrentUserService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public CurrentUserService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CurrentUser currentUser = null;
        try {
            currentUser = new CurrentUser(getByEmail(email));
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return currentUser;
    }

    public Employee getByEmail(String email) throws NotFoundException {
        return employeeRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Employee not exist"));
    }
}
