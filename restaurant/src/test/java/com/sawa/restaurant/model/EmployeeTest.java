package com.sawa.restaurant.model;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;

import static junit.framework.TestCase.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class EmployeeTest {

    private Employee employee = new Employee();

    @BeforeEach
    void setUp(){
        employee = new Employee();
    }

    @Test
    public void removeDisposition() {
        Disposition disposition = new Disposition();
        employee.setDisposition(disposition);

        assertTrue(employee.removeDisposition(disposition));
    }

    @Test
    public void addOrder() {
        employee.addOrder(new Order());

        assertEquals(employee.getOrders().size(),1);
    }

    @Test
    public void removeOrderCorrectly() {
        Order order = new Order();

        employee.addOrder(order);
        employee.removeOrder(order);

        assertEquals(employee.getOrders().size(),0);
    }
}