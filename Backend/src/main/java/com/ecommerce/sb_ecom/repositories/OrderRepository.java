package com.ecommerce.sb_ecom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.sb_ecom.Model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    boolean existsByAddress_AddressId(Long addressId);
}
