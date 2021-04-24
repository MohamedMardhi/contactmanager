import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personnal'
    });
    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personnal'
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary"> Add new contact </h2>   
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder="E-mail" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>
            <h5>Type: </h5>
            <input type="radio"name="type" value="personnal" checked={type === 'personnal'} onChange={onChange}/> Personnal{' '}
            <input type="radio"name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> Professional{' '}
            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default ContactForm