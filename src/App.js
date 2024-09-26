import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import './App.css';

function App() {
  const [details, setDetails] = useState({
    name: '',
    address: '',
    company: '',
    empId: '',
  });

  const [errors, setErrors] = useState({});
  const cardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!details.name) formErrors.name = 'Name is required';
    if (!details.address) formErrors.address = 'Address is required';
    if (!details.company) formErrors.company = 'Company name is required';
    if (!details.empId) formErrors.empId = 'Employee ID is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const downloadCard = () => {
    if (!validateForm()) {
      return;
    }

    if (cardRef.current === null) return;
    toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'id-card.png';
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download card', err);
      });
  };

  return (
    <div className="App">
      <h1>Professional ID Card Generator</h1>

      {/* Form */}
      <div className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className={`input ${errors.name ? 'error-border' : ''}`}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={handleChange}
            className={`input ${errors.address ? 'error-border' : ''}`}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={details.company}
            onChange={handleChange}
            className={`input ${errors.company ? 'error-border' : ''}`}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="empId"
            value={details.empId}
            onChange={handleChange}
            className={`input ${errors.empId ? 'error-border' : ''}`}
          />
          {errors.empId && <p className="error">{errors.empId}</p>}
        </div>

        <button className="download-button" onClick={downloadCard}>
          Download ID Card
        </button>
      </div>

      {/* ID Card Preview */}
      <div ref={cardRef} className="id-card">
        <div className="id-card-header">
          <h2>{details.company || 'Company Name'}</h2>
        </div>
        <div className="id-card-body">
          <div className="profile-pic-placeholder">
            <p>Profile Pic</p>
          </div>
          <div className="card-details">
            <p><strong>Name:</strong> {details.name || 'John Doe'}</p>
            <p><strong>Employee ID:</strong> {details.empId || 'XXXXXX'}</p>
            <p><strong>Address:</strong> {details.address || '123, Your Street, City'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
