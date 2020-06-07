package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.WorkSchedule;
import com.sawa.restaurant.repository.RestaurantRepository;
import com.sawa.restaurant.repository.WorkScheduleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class WorkScheduleService extends DefaultService<WorkSchedule, WorkScheduleRepository> {
    private RestaurantRepository restaurantRepository;

    public WorkScheduleService(WorkScheduleRepository repository, RestaurantRepository restaurantRepository) {
        super(repository);
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public WorkSchedule addNewElement(WorkSchedule item) {
        return repository.save(item);
    }

    public void deleteByRestaurantNumber(Long number) throws NotFoundException {
        delete(restaurantRepository.findById(number).get().getSchedule().getId());
    }

    @Override
    public WorkSchedule modifyElement(WorkSchedule item, Long id) throws NotFoundException {
        get(id);
        item.setId(id);
        return repository.save(item);
    }

    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        repository.deleteById(number);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        WorkSchedule workSchedule = get(number);
        restaurantRepository.findAll().stream().filter(s -> s.getSchedule().equals(workSchedule)).forEach(e -> e.setSchedule(null));
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
