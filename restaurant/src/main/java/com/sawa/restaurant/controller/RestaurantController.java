package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.model.Restaurant;
import com.sawa.restaurant.requestForm.CashBalance;
import com.sawa.restaurant.service.EmployeeService;
import com.sawa.restaurant.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin("http://localhost:3000")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final EmployeeService employeeService;

    public RestaurantController(RestaurantService restaurantService, EmployeeService employeeService) {
        this.restaurantService = restaurantService;
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('HEAD')")
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllElements();
    }

    @PreAuthorize("hasAnyRole('HEAD','MANAGER')")
    @GetMapping("/employees/{id}")
    public List<Employee> getAllEmployeeNotHired(@PathVariable Long id) {
        return restaurantService.getAllEmployeesNotHiredInRestaurant(id);
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurant(@PathVariable Long id) throws NotFoundException {
        return restaurantService.get(id);
    }

    @GetMapping("/cash/{id}")
    public CashBalance getRestaurantCashBalance(@PathVariable Long id) throws NotFoundException {
        return restaurantService.getRestaurantBalance(id);
    }

    @PreAuthorize("hasRole('HEAD')")
    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) throws NotFoundException {
        restaurantService.delete(id);
    }

    @PreAuthorize("hasRole('HEAD')")
    @PutMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) throws AlreadyExistException {
        Restaurant createdRestaurant = restaurantService.addNewElement(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRestaurant);
    }

    @PreAuthorize("hasAnyRole('HEAD','MANAGER')")
    @PostMapping("/{id}")
    public ResponseEntity<Restaurant> modifyRestaurant(@RequestBody Restaurant restaurant, @PathVariable Long id) throws AlreadyExistException {
        Restaurant modifiedRestaurant = restaurantService.modifyRestaurant(restaurant, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(modifiedRestaurant);
    }
}
