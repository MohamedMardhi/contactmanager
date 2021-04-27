import React, {useContext, useEffect, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    // with that we can access(from our comp) to our contexr
    const contactContext = useContext(ContactContext);
    const {getContacts, contacts, filtered, loading} = contactContext;
    useEffect(()=>{
        getContacts();
        // eslint-disable-next-line
    },[])
    if(contacts !== null && contacts.length===0 && !loading){
        <h4>Nothing to display</h4>
    }
    return (
        <Fragment>
        {contacts !== null && !loading ? (
            <TransitionGroup>
            {filtered !== null 
            ? filtered.map(contact=>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                    <ContactItem  contact={contact}/>
                </CSSTransition>
                )) 
            : contacts.map(contact =>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                    <ContactItem contact={contact}/>
                </CSSTransition>
                ))}
        </TransitionGroup>
        ) : 
        <Spinner/>}

        </Fragment>
    )
}
export default Contacts;