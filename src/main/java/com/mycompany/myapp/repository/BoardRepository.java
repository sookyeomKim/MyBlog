package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Board;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Board entity.
 */
public interface BoardRepository extends JpaRepository<Board,Long> {

}
