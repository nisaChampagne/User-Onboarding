import React from 'react'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';


function UserForm({values, errors, touched, isSubmitting}){
    return(
        <Form className='form'>
            <div className='field'>
              <label htmlFor='name'>Name: </label>
              <Field type='text' name='name' id='name' className='field'/>
              {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div className='field'>
              <label htmlFor='email'>Email: </label>
              <Field type='email' name='email' id='email' className='field'/>
              {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div className='field'>
              <label htmlFor='password'>Password: </label>
              <Field type='password' name='password' id='password' className='field'/>
              {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            <div className='field'>
              <label htmlFor='terms'>I accept Terms of Conditions</label>
              <Field type='checkbox' name='terms' id='terms' checked={values.terms}/>
              {touched.terms && errors.terms && <p>{errors.terms}</p>}
            </div>
            <button type='submit' disabled={isSubmitting}>Submit</button>
        </Form>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(2, 'At least 2 characters please')
        .required('This field is required'),
        email: Yup.string()
        .email('Not valid entry')
        .required('This field is required'),
        password: Yup.string()
        .min(6, 'At least 6 characters please')
        .required('This field is required'),
        terms: Yup
        .boolean()
        .oneOf([true], 'Must Check Box to proceed')

    }),

    handleSubmit(values,{ resetForm, setErrors, setSubmitting}) {
        if(values.email === 'ghostrider@yahoo.com'){
            setErrors({ email: 'That email is already taken'});
        } else {
            axios.post('https://reqres.in/api/users', values)
            .then(res =>{
                console.log(res.data);
                resetForm();
                setSubmitting(false);
                window.alert (`Name: ${res.data.name}, Email: ${res.data.email}`);
            })
            .catch(err => {
                console.log(err, 'RUH ROH');
                setSubmitting(false);
            })
        }
    }
})(UserForm);

export default FormikUserForm;