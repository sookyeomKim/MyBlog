package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MyBlogApp;
import com.mycompany.myapp.domain.Board;
import com.mycompany.myapp.repository.BoardRepository;
import com.mycompany.myapp.service.BoardService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the BoardResource REST controller.
 *
 * @see BoardResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MyBlogApp.class)
@WebAppConfiguration
@IntegrationTest
public class BoardResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_CONTENT = "AAAAA";
    private static final String UPDATED_CONTENT = "BBBBB";

    private static final LocalDate DEFAULT_TODAYDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TODAYDATE = LocalDate.now(ZoneId.systemDefault());
    private static final String DEFAULT_TODAYTIME = "AAAAA";
    private static final String UPDATED_TODAYTIME = "BBBBB";

    @Inject
    private BoardRepository boardRepository;

    @Inject
    private BoardService boardService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restBoardMockMvc;

    private Board board;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BoardResource boardResource = new BoardResource();
        ReflectionTestUtils.setField(boardResource, "boardService", boardService);
        this.restBoardMockMvc = MockMvcBuilders.standaloneSetup(boardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        board = new Board();
        board.setName(DEFAULT_NAME);
        board.setContent(DEFAULT_CONTENT);
        board.setTodaydate(DEFAULT_TODAYDATE);
        board.setTodaytime(DEFAULT_TODAYTIME);
    }

    @Test
    @Transactional
    public void createBoard() throws Exception {
        int databaseSizeBeforeCreate = boardRepository.findAll().size();

        // Create the Board

        restBoardMockMvc.perform(post("/api/boards")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(board)))
                .andExpect(status().isCreated());

        // Validate the Board in the database
        List<Board> boards = boardRepository.findAll();
        assertThat(boards).hasSize(databaseSizeBeforeCreate + 1);
        Board testBoard = boards.get(boards.size() - 1);
        assertThat(testBoard.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBoard.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testBoard.getTodaydate()).isEqualTo(DEFAULT_TODAYDATE);
        assertThat(testBoard.getTodaytime()).isEqualTo(DEFAULT_TODAYTIME);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = boardRepository.findAll().size();
        // set the field null
        board.setName(null);

        // Create the Board, which fails.

        restBoardMockMvc.perform(post("/api/boards")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(board)))
                .andExpect(status().isBadRequest());

        List<Board> boards = boardRepository.findAll();
        assertThat(boards).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBoards() throws Exception {
        // Initialize the database
        boardRepository.saveAndFlush(board);

        // Get all the boards
        restBoardMockMvc.perform(get("/api/boards?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(board.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
                .andExpect(jsonPath("$.[*].todaydate").value(hasItem(DEFAULT_TODAYDATE.toString())))
                .andExpect(jsonPath("$.[*].todaytime").value(hasItem(DEFAULT_TODAYTIME.toString())));
    }

    @Test
    @Transactional
    public void getBoard() throws Exception {
        // Initialize the database
        boardRepository.saveAndFlush(board);

        // Get the board
        restBoardMockMvc.perform(get("/api/boards/{id}", board.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(board.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.todaydate").value(DEFAULT_TODAYDATE.toString()))
            .andExpect(jsonPath("$.todaytime").value(DEFAULT_TODAYTIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBoard() throws Exception {
        // Get the board
        restBoardMockMvc.perform(get("/api/boards/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoard() throws Exception {
        // Initialize the database
        boardService.save(board);

        int databaseSizeBeforeUpdate = boardRepository.findAll().size();

        // Update the board
        Board updatedBoard = new Board();
        updatedBoard.setId(board.getId());
        updatedBoard.setName(UPDATED_NAME);
        updatedBoard.setContent(UPDATED_CONTENT);
        updatedBoard.setTodaydate(UPDATED_TODAYDATE);
        updatedBoard.setTodaytime(UPDATED_TODAYTIME);

        restBoardMockMvc.perform(put("/api/boards")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedBoard)))
                .andExpect(status().isOk());

        // Validate the Board in the database
        List<Board> boards = boardRepository.findAll();
        assertThat(boards).hasSize(databaseSizeBeforeUpdate);
        Board testBoard = boards.get(boards.size() - 1);
        assertThat(testBoard.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBoard.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testBoard.getTodaydate()).isEqualTo(UPDATED_TODAYDATE);
        assertThat(testBoard.getTodaytime()).isEqualTo(UPDATED_TODAYTIME);
    }

    @Test
    @Transactional
    public void deleteBoard() throws Exception {
        // Initialize the database
        boardService.save(board);

        int databaseSizeBeforeDelete = boardRepository.findAll().size();

        // Get the board
        restBoardMockMvc.perform(delete("/api/boards/{id}", board.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Board> boards = boardRepository.findAll();
        assertThat(boards).hasSize(databaseSizeBeforeDelete - 1);
    }
}
