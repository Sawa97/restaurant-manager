package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Table;
import com.sawa.restaurant.repository.OrderRepository;
import com.sawa.restaurant.repository.RestaurantRepository;
import com.sawa.restaurant.repository.TableRepository;
import com.sawa.restaurant.requestForm.TableRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TableService extends DefaultService<Table, TableRepository> {

    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;

    public TableService(TableRepository repository, RestaurantRepository restaurantRepository, OrderRepository orderRepository) {
        super(repository);
        this.restaurantRepository = restaurantRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public Table addNewElement(Table item) {
        return repository.save(item);
    }

    public List<Table> getAllByRestaurantId(Long id){
        return restaurantRepository.findById(id).get().getTables().stream().collect(Collectors.toList());
    }

    public Table addNewTableToRestaurant(TableRequest tableRequest) {
        Table table = Table.builder().number(tableRequest.getNumber()).capacity(tableRequest.getCapacity()).taken(false).build();
        return repository.save(table);
    }

    @Override
    public Table modifyElement(Table item, Long id) throws NotFoundException {
        getElement(id);
        item.setId(id);
        return repository.save(item);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        removeAllConnectings(id);
        repository.deleteById(id);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        Table table = get(number);
        restaurantRepository.findAll().stream().filter(s->s.removeTable(table)).forEach(restaurantRepository::save);
        orderRepository.findAll().stream().filter(s->s.getTable().equals(table)).forEach(e -> {e.setTable(null);
        orderRepository.save(e);
        });
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
