package com.ecommerce.sb_ecom.repositories;

import com.ecommerce.sb_ecom.Model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
