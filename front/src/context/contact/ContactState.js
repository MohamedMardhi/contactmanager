import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CONTACT_ERROR
} from '../types';

// CREATE INITIAL STATE
const ContactState = props => {
    const initialState = {
        contacts: null,
        error: null,
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts')
            dispatch({type : GET_CONTACTS, payload: res.data})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})
        }
    }
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
    const deleteContact = async id => {
        //dispatch({type : DELETE_CONTACT, payload: id})
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({type : DELETE_CONTACT, payload: id})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})
        }
    }
    const clearContacts = () => {
        dispatch({type : CLEAR_CONTACTS})
    }
    // UPDATE CONTACT
    const updateContact =  async contact => {
        //dispatch({type : UPDATE_CONTACT, payload: contact})
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({type : UPDATE_CONTACT, payload: res.data})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})
        }

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
            getContacts,
            addContact,
            deleteContact,
            updateContact,
            clearContacts,
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