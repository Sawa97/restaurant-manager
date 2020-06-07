package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.DayPlanForEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DayPlanForEmployeeRepository extends JpaRepository<DayPlanForEmployee,Long> {
    Optional<DayPlanForEmployee> findByDateAndEmployee_Number(LocalDate date, Long number);
    List<DayPlanForEmployee> findAllByEmployee_Number(Long number);
    List<DayPlanForEmployee> findAllByDate(LocalDate date);
    void deleteAllByDate(LocalDate date);
}
