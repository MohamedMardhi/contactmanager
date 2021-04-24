import React, {useContext, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    // with that we can access(from our comp) to our contexr
    const contactContext = useContext(ContactContext);
    const {contacts, filtered} = contactContext;
    if(contacts.length===0){
        <h4>Nothing to display</h4>
    }
    return (
        <Fragment>
        <TransitionGroup>
            {filtered !== null 
            ? filtered.map(contact=>(
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                    <ContactItem  contact={contact}/>
                </CSSTransition>
                )) 
            : contacts.map(contact =>(
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                    <ContactItem contact={contact}/>
                </CSSTransition>
                ))}
        </TransitionGroup>
        </Fragment>
    )
}
export default Contacts;