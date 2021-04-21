import React, {useReducer} from 'react';
import uuid from 'uuid';
import contactContext from './contactContext';
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
} from '../types'

// CREATE INITIAL STATE
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personnal",
                "_id": "607b7b9126f4a646822ec30e",
                "name": "Rachid",
                "email": "rachid@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "_id": "607b7a6ba9735844683a5bc6",
                "name": "Rachid",
                "email": "rachid@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "_id": "607b79e3a9735844683a5bc5",
                "name": "I",
                "email": "ismaildahmani01@gmail.com",
                "phone": "06-45-65-78-98",
            },
            {
                "type": "personnal",
                "_id": "607b12417c0498045be641bf",
                "name": "Ismail DAHMANI",
                "email": "ismaildahmani01@gmail.com",
                "phone": "06-45-65-78-98",
            }
        ]
    }
    const [state, disoatch] = useReducer(contactReducer, initialState);

    return (
        <contactContext.Provider
        value= {{
            contacts: state.contacts
        }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;