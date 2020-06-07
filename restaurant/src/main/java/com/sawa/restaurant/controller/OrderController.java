package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.model.Order;
import com.sawa.restaurant.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/restaurant/{id}")
    public List<Order> getOrderByRestaurant(@PathVariable Long id) throws NotFoundException {
        return orderService.getByRestaurant(id);
    }

    @GetMapping("/waiter/{id}")
    public List<Order> getOrderByWaiter(@PathVariable Long id) throws NotFoundException {
        return orderService.getByWaiter(id);
    }

    @GetMapping("/table/{id}")
    public Order getOrderByTable(@PathVariable Long id) throws NotFoundException {
        return orderService.getByTableId(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) throws NotFoundException {
        orderService.delete(id);
    }

    @PostMapping("/{id}")
    public void modifyOrder(@RequestBody Order order, @PathVariable Long id) throws NotFoundException {
        orderService.modifyElement(order, id);
    }

    @GetMapping("/end/{id}")
    public void changeOrderStatus(@PathVariable Long id) throws NotFoundException {
        orderService.finishOrder(id);
    }

    @GetMapping("/employee/{orderId}")
    public Employee getEmployeeByOrder(@PathVariable Long orderId){
        return orderService.getEmployeeByOrderNumber(orderId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> addNewOrder(@RequestBody Order order, @PathVariable Long id) throws AlreadyExistException {
        Order createdOrder = orderService.addNewElement(order, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }


}
