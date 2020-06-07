package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findByTableId(Long number);
    void deleteByTableId(Long number);
}
