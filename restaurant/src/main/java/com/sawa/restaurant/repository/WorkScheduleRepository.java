package com.sawa.restaurant.repository;


import com.sawa.restaurant.model.WorkSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkScheduleRepository extends JpaRepository<WorkSchedule,Long> {
}
