package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository<Table,Long> {
}
