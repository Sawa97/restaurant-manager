package com.sawa.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Builder
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = WorkSchedule.class)
public class WorkSchedule {
    @Id
    @GeneratedValue
    private Long id;
    @OneToMany(fetch = FetchType.LAZY)
    private Set<DayPlanForEmployee> dayPlanForEmployees = new HashSet<>();

    public void addDayPlan(@NotNull DayPlanForEmployee dayPlanForEmployee){
        dayPlanForEmployees.add(dayPlanForEmployee);
    }

    public boolean removeDayPlan(@NotNull DayPlanForEmployee dayPlanForEmployee){
        return dayPlanForEmployees.remove(dayPlanForEmployee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
