package com.ecommerce.sb_ecom.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.sb_ecom.Model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findFirstByUser_EmailOrderByCartIdDesc(String email);

    default Cart findCartByEmail(String email) {
        return findFirstByUser_EmailOrderByCartIdDesc(email);
    }

    @Query("SELECT c FROM Cart c WHERE c.user.email = ?1 AND c.id = ?2")
    Cart findCartByEmailAndCartId(String emailId, Long cartId);

    @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems " +
            "ci JOIN FETCH ci.product p where p.id = ?1")
    List<Cart> findCartsByProductId(Long productId);
}
