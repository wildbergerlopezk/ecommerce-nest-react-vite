import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../FormStyles.css';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'CUSTOMER',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/users`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      });

      if (response.status === 201) {
        setSuccessMessage('Usuario registrado con éxito');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          role: 'CUSTOMER',
        });
        setTimeout(() => {
          navigate('/login'); 
        }, 1500);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message;
      if (Array.isArray(msg)) {
        setErrorMessage(msg[0]);
      } else {
        setErrorMessage(msg || 'Error al registrar usuario');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex-column"><label>Full Name</label></div>
      <div className="inputForm">
        <input
          type="text"
          name="name"
          className="input"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex-column"><label>Email</label></div>
      <div className="inputForm">
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex-column"><label>Password</label></div>
      <div className="inputForm">
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="flex-column"><label>Confirm Password</label></div>
      <div className="inputForm">
        <input
          type="password"
          name="confirmPassword"
          className="input"
          placeholder="Confirm your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="flex-column"><label>Phone</label></div>
      <div className="inputForm">
        <input
          type="text"
          name="phone"
          className="input"
          placeholder="Enter your Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex-row">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms">I agree to the Terms and Conditions</label>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" className="button-submit">Sign Up</button>

      <p className="p">
        Already have an account?{" "}
        <Link to="/login" className="span">Sign In</Link>
      </p>
      <div className="flex-row">
        <button className="btn google">
          <svg version="1.1" width={20} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
            <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
            <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
            <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
          </svg>
          Google
        </button>
        
        <button className="btn apple">
          <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.773 22.773">
            <g>
              <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
              <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
            </g>
          </svg>
          Apple
        </button>
      </div>
    </form>

  );
};

export default RegisterForm;
