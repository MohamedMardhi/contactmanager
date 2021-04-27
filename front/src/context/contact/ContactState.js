import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CONTACT_ERROR
} from '../types';

// CREATE INITIAL STATE
const ContactState = props => {
    const initialState = {
        contacts: [],
        error: null,
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADDING NEW CONTACT
    const addContact = async contact => {
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({type : ADD_CONTACT, payload: res.data})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})
        }
    }
    // DELETE CONTACT
    const deleteContact = id => {
        dispatch({type : DELETE_CONTACT, payload: id})
    }
    // UPDATE CONTACT
    const updateContact = contact => {
        dispatch({type : UPDATE_CONTACT, payload: contact})
    }
    // SET CURRENT CONTACT
    const setCurrent = contact => {
        dispatch({type : SET_CURRENT, payload: contact})
    }
    // CLEAR CURRENT CONTACT
    const clearCurrent = () => {
        dispatch({type : CLEAR_CURRENT})
    }
    // Filter (search) contact by name
    const filterContacts = text => {
        dispatch({type : FILTER_CONTACTS, payload: text})
    }
    // clear filter
    const clearFilter = () => {
        dispatch({type : CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
        value= {{
            contacts: state.contacts,
            error: state.error,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            updateContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter,

        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}


export default ContactState;