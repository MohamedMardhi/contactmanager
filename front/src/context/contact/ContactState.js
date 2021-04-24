import React, {useReducer} from 'react';
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    SET_ALERT,
    CLEAR_FILTER,
    REMOVE_ALERT,
} from '../types';

// CREATE INITIAL STATE
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personnal",
                "id": "607b7b9126f4a646822ec30e",
                "name": "Rachid",
                "email": "rachid@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "id": "607b7a6ba9735844683a5bc6",
                "name": "Rachid",
                "email": "rachid@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "id": "607b79e3a9735844683a5bc5",
                "name": "I",
                "email": "ismaildahmani01@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "id": "607b12417c0498045be641bf",
                "name": "Ismail DAHMANI",
                "email": "ismaildahmani01@gmail.com",
                "phone": "06-45-65-78-98",
            }
        ],
        current: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADDING NEW CONTACT
    const addContact = contact => {
        contact.id = uuid.v4;
        dispatch({type : ADD_CONTACT, payload: contact})
    }
    // DELETE CONTACT
    const deleteContact = id => {
        dispatch({type : DELETE_CONTACT, payload: id})
    }
    // SET CURRENT CONTACT
    const setCurrent = contact => {
        dispatch({type : SET_CURRENT, payload: contact})
    }
    const clearCurrent = () => {
        dispatch({type : CLEAR_CURRENT})
    }
    return (
        <ContactContext.Provider
        value= {{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}


export default ContactState;