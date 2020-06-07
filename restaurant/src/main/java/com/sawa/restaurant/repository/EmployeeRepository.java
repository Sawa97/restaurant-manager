package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Optional<Employee> findByNumber(Long number);
    Optional<Employee> findByEmail(String email);
    void deleteByNumber(Long number);
}
