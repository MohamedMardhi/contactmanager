import React, {useContext, Fragment} from 'react';
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
            {filtered !== null 
            ? filtered.map(contact=>(
                <ContactItem key={contact.id} contact={contact}/>
                )) 
            : contacts.map(contact =>(
                <ContactItem key={contact.id} contact={contact}/>
                ))}
        </Fragment>
    )
}
export default Contacts;