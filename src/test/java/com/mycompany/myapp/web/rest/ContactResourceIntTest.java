package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MyBlogApp;
import com.mycompany.myapp.domain.Contact;
import com.mycompany.myapp.repository.ContactRepository;
import com.mycompany.myapp.service.ContactService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ContactResource REST controller.
 *
 * @see ContactResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MyBlogApp.class)
@WebAppConfiguration
@IntegrationTest
public class ContactResourceIntTest {

    private static final String DEFAULT_EMAIL = "AAAAA";
    private static final String UPDATED_EMAIL = "BBBBB";
    private static final String DEFAULT_MASSAGE = "AAAAA";
    private static final String UPDATED_MASSAGE = "BBBBB";

    @Inject
    private ContactRepository contactRepository;

    @Inject
    private ContactService contactService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restContactMockMvc;

    private Contact contact;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ContactResource contactResource = new ContactResource();
        ReflectionTestUtils.setField(contactResource, "contactService", contactService);
        this.restContactMockMvc = MockMvcBuilders.standaloneSetup(contactResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        contact = new Contact();
        contact.setEmail(DEFAULT_EMAIL);
        contact.setMassage(DEFAULT_MASSAGE);
    }

    @Test
    @Transactional
    public void createContact() throws Exception {
        int databaseSizeBeforeCreate = contactRepository.findAll().size();

        // Create the Contact

        restContactMockMvc.perform(post("/api/contacts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(contact)))
                .andExpect(status().isCreated());

        // Validate the Contact in the database
        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts).hasSize(databaseSizeBeforeCreate + 1);
        Contact testContact = contacts.get(contacts.size() - 1);
        assertThat(testContact.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContact.getMassage()).isEqualTo(DEFAULT_MASSAGE);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactRepository.findAll().size();
        // set the field null
        contact.setEmail(null);

        // Create the Contact, which fails.

        restContactMockMvc.perform(post("/api/contacts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(contact)))
                .andExpect(status().isBadRequest());

        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMassageIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactRepository.findAll().size();
        // set the field null
        contact.setMassage(null);

        // Create the Contact, which fails.

        restContactMockMvc.perform(post("/api/contacts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(contact)))
                .andExpect(status().isBadRequest());

        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContacts() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        // Get all the contacts
        restContactMockMvc.perform(get("/api/contacts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(contact.getId().intValue())))
                .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
                .andExpect(jsonPath("$.[*].massage").value(hasItem(DEFAULT_MASSAGE.toString())));
    }

    @Test
    @Transactional
    public void getContact() throws Exception {
        // Initialize the database
        contactRepository.saveAndFlush(contact);

        // Get the contact
        restContactMockMvc.perform(get("/api/contacts/{id}", contact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(contact.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.massage").value(DEFAULT_MASSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContact() throws Exception {
        // Get the contact
        restContactMockMvc.perform(get("/api/contacts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContact() throws Exception {
        // Initialize the database
        contactService.save(contact);

        int databaseSizeBeforeUpdate = contactRepository.findAll().size();

        // Update the contact
        Contact updatedContact = new Contact();
        updatedContact.setId(contact.getId());
        updatedContact.setEmail(UPDATED_EMAIL);
        updatedContact.setMassage(UPDATED_MASSAGE);

        restContactMockMvc.perform(put("/api/contacts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedContact)))
                .andExpect(status().isOk());

        // Validate the Contact in the database
        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts).hasSize(databaseSizeBeforeUpdate);
        Contact testContact = contacts.get(contacts.size() - 1);
        assertThat(testContact.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContact.getMassage()).isEqualTo(UPDATED_MASSAGE);
    }

    @Test
    @Transactional
    public void deleteContact() throws Exception {
        // Initialize the database
        contactService.save(contact);

        int databaseSizeBeforeDelete = contactRepository.findAll().size();

        // Get the contact
        restContactMockMvc.perform(delete("/api/contacts/{id}", contact.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
