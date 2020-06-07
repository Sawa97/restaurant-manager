package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class DefaultService<K, T extends JpaRepository<K, Long>> {
    public final T repository;

    public DefaultService(T repository) {
        this.repository = repository;
    }

    public abstract K addNewElement(K item) throws Exception;

    public List<K> getAllElements() {
        return repository.findAll();
    }

    public K getElement(Long number) throws NotFoundException {
        return get(number);
    }

    public K get(Long id) throws NotFoundException {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Searching thing not exist, "+getExceptionItem()));
    }

    public void delete(Long number) throws NotFoundException {
        get(number);
        repository.deleteById(number);
    }

    public K modifyElement(K item, Long id) throws NotFoundException {
        return repository.save(item);
    }

    public abstract String getExceptionItem();
}
