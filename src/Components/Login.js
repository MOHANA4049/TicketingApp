import React from 'react';
import { useFormik } from 'formik';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const LoginForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const { setUsername } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = values => {
    console.log("Form data", values);
    setUsername(values.username);
    navigate('/dashboard');
  };

  const validate = values => {
    let errors = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(values.password)) {
      errors.password =
        'Password must be at least 8 characters long and include at least one letter and one digit.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className='text-xl font-bold mb-4 text-center'>Login</h1>

        <div className="mb-4">
          <label htmlFor='username' className="block text-sm mb-1">Username</label>
          <input 
            type='text'
            name='username' 
            id='username' 
            placeholder='username'
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.username}
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.username && formik.errors.username ? <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div> : null}
        </div>

        <div className="mb-4">
          <label htmlFor='email' className="block text-sm mb-1">Email</label>
          <input 
            type='email' 
            name='email' 
            id='email' 
            placeholder='email'
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.email}
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div> : null}
        </div>

        <div className="mb-4">
          <label htmlFor='password' className="block text-sm mb-1">Password</label>
          <input 
            type='password' 
            name='password' 
            id='password' 
            placeholder='password'
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.password}
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div> : null}
        </div>

        <button type='submit' className="w-half bg-blue-500 text-white p-2 rounded mt-4 block mx-auto">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;

