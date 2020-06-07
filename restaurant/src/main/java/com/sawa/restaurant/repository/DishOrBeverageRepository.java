package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.DishOrBeverage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DishOrBeverageRepository extends JpaRepository<DishOrBeverage,Long> {
    Optional<DishOrBeverage> findByName(String name);
    void deleteByName(String name);
}
