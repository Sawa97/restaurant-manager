package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    Optional<Restaurant> findByAddressAndCity(String address, String city);
}
