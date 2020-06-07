package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.DishOrBeverage;
import com.sawa.restaurant.repository.DishOrBeverageRepository;
import com.sawa.restaurant.repository.OrderRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class DishOrBeverageService extends DefaultService<DishOrBeverage, DishOrBeverageRepository> {

    private final OrderRepository orderRepository;

    public DishOrBeverageService(DishOrBeverageRepository repository, OrderRepository orderRepository) {
        super(repository);
        this.orderRepository = orderRepository;
    }

    @Override
    public DishOrBeverage addNewElement(DishOrBeverage item) throws AlreadyExistException {
        Optional<DishOrBeverage> optional = repository.findByName(item.getName());
        if (optional.isPresent()) {
            throw new AlreadyExistException("Dish already exist " + item.getName());
        }
        return repository.save(item);
    }

    public DishOrBeverage modifyByName(DishOrBeverage item, String name) throws NotFoundException {
        getByName(name);
        item.setId(repository.findByName(name).get().getId());
        return repository.save(item);
    }

    public DishOrBeverage getByName(String itemName) throws NotFoundException {
        return repository.findByName(itemName).orElseThrow(() -> new NotFoundException("Searching thing not exist"));
    }

    public void deleteByName(String name)throws NotFoundException{
        removeAllConnectings(getByName(name).getId());
        repository.deleteByName(name);
    }

    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        repository.deleteById(number);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        DishOrBeverage dishOrBeverage = get(number);
        orderRepository.findAll().stream().filter(s->s.removeDish(dishOrBeverage)).forEach(orderRepository::save);
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
