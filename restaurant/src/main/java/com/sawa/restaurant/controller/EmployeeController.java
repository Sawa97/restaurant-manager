package com.sawa.restaurant.controller;


import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.model.RoleType;
import com.sawa.restaurant.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employees")
@CrossOrigin("http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @PutMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody @Valid Employee employee) throws Exception {
        Employee createdEmployee = employeeService.addNewElement(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Employee> editEmployee(@PathVariable Long id,@RequestBody @Valid Employee employee) throws NotFoundException {
        Employee createdEmployee = employeeService.modify(employee,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllElements().stream().filter(emp -> emp.getRole() != RoleType.HEAD).collect(Collectors.toList());
    }


    @GetMapping("/{number}")
    public Employee getEmployee(@PathVariable Long number) throws NotFoundException {
        return employeeService.getElement(number);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @DeleteMapping("/{number}")
    public void deleteEmployee(@PathVariable Long number) throws NotFoundException {
        employeeService.delete(number);
    }

    @GetMapping("/login")
    public void login() {
        //dummy method to login
    }

    @GetMapping("/reset/{email}")
    public boolean resetPassword(@PathVariable String email) throws Exception {
        return employeeService.resetUserPassword(email);
    }


    @GetMapping("/email/{email}")
    public Employee getEmployeeByEmail(@PathVariable String email) throws NotFoundException {
        return employeeService.getByEmail(email);
    }

    @GetMapping("/me")
    public Employee getCurrentUser(Principal principal) throws NotFoundException {
        return employeeService.getByEmail(principal.getName());
    }

    @GetMapping("/me/restaurantNumber")
    public Long getCurrentUserRestaurantNumber(Principal principal) throws NotFoundException {
        return employeeService.getByEmail(principal.getName()).getRestaurant().getId();
    }

}
