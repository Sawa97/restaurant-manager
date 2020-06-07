package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.*;
import com.sawa.restaurant.repository.EmployeeRepository;
import com.sawa.restaurant.repository.RestaurantRepository;
import com.sawa.restaurant.requestForm.CashBalance;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RestaurantService extends DefaultService<Restaurant, RestaurantRepository> {

    private final EmployeeRepository employeeRepository;
    private final TableService tableService;

    public RestaurantService(RestaurantRepository repository, EmployeeRepository employeeRepository, TableService tableService) {
        super(repository);
        this.employeeRepository = employeeRepository;
        this.tableService = tableService;
    }

    @Override
    public Restaurant addNewElement(Restaurant item) throws AlreadyExistException {
        checkIfExistRestaurant(item);
        Restaurant restaurantResult = repository.save(item);
        addConnectingToEmployees(item);
        return restaurantResult;
    }

    private void checkIfExistRestaurant(Restaurant restaurant) throws AlreadyExistException {
        if (repository.findByAddressAndCity(restaurant.getAddress(), restaurant.getCity()).isPresent()) {
            throw new AlreadyExistException("Restaurant already exist " + restaurant.getCity() + ", " + restaurant.getAddress());
        }
    }

    public Restaurant modifyRestaurant(Restaurant restaurant, Long id) throws AlreadyExistException {

        Restaurant actual = repository.findById(id).get();

        if (restaurant.getSchedule() == null) {
            restaurant.setSchedule(actual.getSchedule());
        }

        restaurant.setId(id);
        if (restaurant.getManager() != null && restaurant.getEmployees() != null) {
            restaurant.removeEmployee(restaurant.getManager());
        }
        Restaurant restaurantResult = repository.save(restaurant);
        addConnectingToEmployees(restaurantResult);
        return restaurantResult;
    }

    public List<Employee> getAllEmployeesNotHiredInRestaurant(Long id) {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().filter(employee -> employee.getRole() != RoleType.HEAD).filter(employee -> employee.getRestaurant() == null).collect(Collectors.toList());
    }

    public CashBalance getRestaurantBalance(Long id) {
        Restaurant restaurant = repository.findById(id).get();
        Date today = new Date();
        double day;
        double month;
        double year;

        List<Order> orders = new ArrayList<>();
        for (Employee employee : restaurant.getEmployees()) {
            orders.addAll(employee.getOrders());
        }

        day = orders.stream().filter(e ->
                DateUtils.isSameDay(e.getDate(), today)).mapToDouble(Order::getPrice).sum();

        month = orders.stream().filter(e -> today.getYear() == e.getDate().getYear() && today.getMonth() == e.getDate().getMonth()).mapToDouble(Order::getPrice).sum();

        year = orders.stream().filter(e -> today.getYear() == e.getDate().getYear()).mapToDouble(Order::getPrice).sum();

        return new CashBalance(day, month, year);
    }


    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        repository.deleteById(number);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        Restaurant restaurant = get(number);
        employeeRepository.findAll().stream().filter(s -> s.getRestaurant().equals(restaurant)).forEach(e -> {
            e.setRestaurant(null);
            employeeRepository.save(e);
        });
        for (Table table : restaurant.getTables()) {
            try {
                tableService.delete(table.getId());
            } catch (NotFoundException ex) {
                ex.printStackTrace();
            }
        }
    }

    public void addConnectingToEmployees(Restaurant restaurant) {
        if (restaurant.getEmployees() != null) {
            for (Employee employee : restaurant.getEmployees()) {
                if (employee.getRestaurant() == null || !employee.getRestaurant().equals(restaurant)) {
                    employee.setRestaurant(restaurant);
                    employeeRepository.save(employee);
                }
            }
        }


        employeeRepository.findAll().stream().filter(employee -> employee.getRestaurant() != null && employee.getRestaurant().equals(restaurant)).forEach(employee -> {
            if (restaurant.getEmployees() == null) {
                if (employee.getRole() == RoleType.MANAGER) {
                    employee.setRole(RoleType.WAITER);
                }
                employee.setRestaurant(null);
                employeeRepository.save(employee);
            } else if (!restaurant.getEmployees().contains(employee)) {
                if (employee.getRole() == RoleType.MANAGER) {
                    employee.setRole(RoleType.WAITER);
                }
                employee.setRestaurant(null);
                employeeRepository.save(employee);
            }
        });

        if (restaurant.getManager() != null) {
            Employee manager = restaurant.getManager();
            if (manager.getRole() != RoleType.HEAD) {
                manager.setRole(RoleType.MANAGER);
            }
            manager.setRestaurant(restaurant);
            employeeRepository.save(manager);
        }


    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
