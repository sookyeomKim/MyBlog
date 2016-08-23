package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Board;
import com.mycompany.myapp.repository.BoardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Board.
 */
@Service
@Transactional
public class BoardService {

    private final Logger log = LoggerFactory.getLogger(BoardService.class);
    
    @Inject
    private BoardRepository boardRepository;
    
    /**
     * Save a board.
     * 
     * @param board the entity to save
     * @return the persisted entity
     */
    public Board save(Board board) {
        log.debug("Request to save Board : {}", board);
        Board result = boardRepository.save(board);
        return result;
    }

    /**
     *  Get all the boards.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Board> findAll(Pageable pageable) {
        log.debug("Request to get all Boards");
        Page<Board> result = boardRepository.findAll(pageable); 
        return result;
    }

    /**
     *  Get one board by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Board findOne(Long id) {
        log.debug("Request to get Board : {}", id);
        Board board = boardRepository.findOne(id);
        return board;
    }

    /**
     *  Delete the  board by id.
     *  
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Board : {}", id);
        boardRepository.delete(id);
    }
}
