package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.DayPlanForEmployee;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.model.Restaurant;
import com.sawa.restaurant.model.WorkSchedule;
import com.sawa.restaurant.repository.DayPlanForEmployeeRepository;
import com.sawa.restaurant.repository.EmployeeRepository;
import com.sawa.restaurant.repository.RestaurantRepository;
import com.sawa.restaurant.repository.WorkScheduleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@Transactional
public class DayPlanService extends DefaultService<DayPlanForEmployee, DayPlanForEmployeeRepository> {

    private final WorkScheduleRepository workScheduleRepository;
    private final RestaurantRepository restaurantRepository;
    private final EmployeeRepository employeeRepository;


    public DayPlanService(DayPlanForEmployeeRepository repository, WorkScheduleRepository workScheduleRepository, RestaurantRepository restaurantRepository, EmployeeRepository employeeRepository) {
        super(repository);
        this.workScheduleRepository = workScheduleRepository;
        this.restaurantRepository = restaurantRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public DayPlanForEmployee addNewElement(DayPlanForEmployee item) {
        DayPlanForEmployee saved = repository.save(item);
        Employee employee = employeeRepository.findByNumber(saved.getEmployee().getNumber()).get();

        WorkSchedule workSchedule = new WorkSchedule();

        if(employee.getRestaurant().getSchedule()!=null) {
            workSchedule = employee.getRestaurant().getSchedule();

        }else {
                workScheduleRepository.save(workSchedule);
                Restaurant newRestaurant = restaurantRepository.findById(employee.getRestaurant().getId()).get();
                newRestaurant.setSchedule(workSchedule);
                restaurantRepository.save(newRestaurant);
            }

        workSchedule.addDayPlan(item);
        workScheduleRepository.save(workSchedule);
        return saved;
    }

    public List<DayPlanForEmployee> getAllElementsByEmployee(Long id) {
        return repository.findAllByEmployee_Number(id);
    }

    public void deleteAllPrevious() {
        LocalDate yesterday = LocalDate.now().minus(Period.ofDays(1));
        repository.findAllByDate(yesterday).forEach(s -> {
            try {
                removeAllConnectings(s.getId());
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        });
        repository.deleteAllByDate(yesterday);
    }

    @Override
    public DayPlanForEmployee modifyElement(DayPlanForEmployee item, Long id) throws NotFoundException {
        item.setId(get(id).getId());
        return repository.save(item);
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }

    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        repository.deleteById(number);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        DayPlanForEmployee dayPlanForEmployee = get(number);
        workScheduleRepository.findAll().stream().filter(s -> s.removeDayPlan(dayPlanForEmployee)).forEach(workScheduleRepository::save);
    }
}
