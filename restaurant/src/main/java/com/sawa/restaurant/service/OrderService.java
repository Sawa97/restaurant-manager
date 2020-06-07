package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.*;
import com.sawa.restaurant.repository.EmployeeRepository;
import com.sawa.restaurant.repository.OrderRepository;
import com.sawa.restaurant.repository.RestaurantRepository;
import com.sawa.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.*;

@Service
@Transactional
public class OrderService extends DefaultService<Order, OrderRepository> {

    private final TableRepository tableRepository;
    private final EmployeeRepository employeeRepository;
    private final RestaurantRepository restaurantRepository;

    public OrderService(OrderRepository repository, TableRepository tableRepository, EmployeeRepository employeeRepository, RestaurantRepository restaurantRepository) {
        super(repository);
        this.tableRepository = tableRepository;
        this.employeeRepository = employeeRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public Order addNewElement(Order item, Long id) {
        double price = 0;
        for (DishOrBeverage dishOrBeverage : item.getDishes()) {
            price += dishOrBeverage.getPrice();
        }
        item.setPrice(price);
        item.setStartTime(LocalTime.now());
        item.setStatus(StatusType.IN_PROGRESS);
        item.setTimeToGive(0);
        item.setDate(new Date());

        Table table = tableRepository.findById(item.getTable().getId()).get();
        table.setTaken(true);
        tableRepository.save(table);

        Order order = repository.save(item);

        Employee waiter = employeeRepository.findById(id).get();
        waiter.addOrder(item);
        employeeRepository.save(waiter);

        return order;
    }

    public List<Order> getByWaiter(Long id) throws NotFoundException {
        return employeeRepository.findById(id).get().getOrders();
    }

    public Order getByTableId(Long id) {
        Optional<Order> optional = repository.findAll().stream().filter(o -> o.getTable().getId().equals(id)).filter(order -> !(order.getStatus() == StatusType.PAYED)).findFirst();
        if (optional.isPresent()) {
            return optional.get();
        } else return null;
    }

    public List<Order> getByRestaurant(Long id) throws NotFoundException {
        Restaurant restaurant = restaurantRepository.findById(id).get();
        List<Order> orders = new ArrayList<>();
        for(Employee employee: restaurant.getEmployees()){
            orders.addAll(employee.getOrders());
        }
        return orders;
    }

    public Employee getEmployeeByOrderNumber(Long id){
        Order order = repository.findById(id).get();
        return employeeRepository.findAll().stream().filter(o->o.getOrders().contains(order)).findFirst().get();
    }

    @Override
    public Order modifyElement(Order item, Long id) throws NotFoundException {
        Order old = repository.findById(id).get();

        if(item.getTimeToGive()!=0){
            old.setTimeToGive(item.getTimeToGive());
            return repository.save(old);
        }

        old.setDishes(item.getDishes());

        double price = 0;
        for (DishOrBeverage dishOrBeverage : item.getDishes()) {
            price += dishOrBeverage.getPrice();
        }
        old.setPrice(price);
        old.setAdditionalComments(item.getAdditionalComments());

        return repository.save(old);
    }

    public void finishOrder(Long id){
        Order order = repository.findById(id).get();
        order.setEndTime(LocalTime.now());
        order.setStatus(StatusType.PAYED);
        repository.save(order);

        Table table = order.getTable();
        table.setTaken(false);

        tableRepository.save(table);
    }

    @Override
    public Order addNewElement(Order item) throws AlreadyExistException {
        return null;
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        removeAllConnectings(id);
        repository.deleteById(id);
    }

    public void removeAllConnectings(Long id) throws NotFoundException {
        Order order = repository.findById(id).get();
        employeeRepository.findAll().stream().filter(s -> s.removeOrder(order)).forEach(employeeRepository::save);
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
