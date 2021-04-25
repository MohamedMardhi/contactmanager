import React, {useState} from 'react'

 const Register = () => {
     const [user, setUser] = useState({
        name: '',
        email:'',
        password:'',
        passwordConfirmation:''
     })
     const {name, email, password, passwordConfirmation} = user;
    return (
        <div>
            
        </div>
    )
}

export default Register;