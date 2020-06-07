package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.Disposition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DispositionRepository extends JpaRepository<Disposition,Long> {
    Optional<Disposition> findByEmployee_Number(Long number);
     void deleteAllByEmployeeRestaurant_Id(Long number);
    Optional<Disposition> findByDescription(String description);
    List<Disposition> findAllByEmployee_Restaurant_Id(Long id);
}
