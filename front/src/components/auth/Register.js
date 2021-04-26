import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

 const Register = () => {
     const alertContext = useContext(AlertContext)
     const authContext = useContext(AuthContext)
     const { setAlert } = alertContext;
     const { register, error, clearErrors } = authContext;

     useEffect(()=>{
         if(error === 'we have a user registred with this e-mail, you forgot your password !'){
             setAlert(error, 'danger')
             clearErrors();
         }
     }, [error])

     const [user, setUser] = useState({
        name: '',
        email:'',
        password:'',
        passwordConfirmation:''
     })

     const {name, email, password, passwordConfirmation} = user;

     const onChange = e => setUser({...user, [e.target.name] : e.target.value});

     const onSubmit = e => {
         e.preventDefault();
         if(name === '' || email === '' || password === ''){
            setAlert('all fields are required, please fill all fields', 'danger')
         } else if(password !== passwordConfirmation) {
            setAlert('passwords doesnt match', 'danger')
         }else{
             register({
                 name,
                 email,
                 password
             })
         }
     }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="email">E-mail :</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password :</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="passwordConfirmation">Password Confirmation :</label>
                    <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={onChange}/>
                </div>
                <input type='submit' value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register;