package com.ecommerce.sb_ecom.repositories;

import com.ecommerce.sb_ecom.Model.OrderItem;
import com.ecommerce.sb_ecom.payload.OrderItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
