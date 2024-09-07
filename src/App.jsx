import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddTalentDetail from './Componet/Talentdetail'; // Fixed typo
import {db} from '../src/Firebase/firebase'
import { addDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import MainRouter from './Componet/Router/MainRouter';

const initialTalent = { id: 1, name: '', contractDuration: '', billRate: '', standardTimeBR: '', overTimeBR: '', currency: 'USD' };

const PurchaseOrderForm = () => {
  const [talents, setTalents] = useState([]);
  const PurchessCollection = collection(db, "PurchaseOrder"); // Corrected spelling

  const [formState, setFormState] = useState({
    clientName: '',
    poType: '',
    poNumber: '',
    receivedOn: '',
    receivedFromName: '', // Correct field name
    receivedFromEmail: '', // Correct field name
    poStartDate: new Date(),
    poEndDate: new Date(),
    budget: '',
    currency: 'USD',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleDateChange = (name, date) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: date,
    }));

    if (name === 'poEndDate' && formState.poStartDate && date < formState.poStartDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        poEndDate: 'PO End Date cannot be earlier than PO Start Date.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        poEndDate: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPurchaseOrder = {
      ...formState,
      talents: talents,
      createdAt: new Date()
    };

    try {
      const document = await addDoc(PurchessCollection, newPurchaseOrder);

      console.log("Document written with ID: ", document.id);

      setFormState({
        clientName: '',
        poType: '',
        poNumber: '',
        receivedOn: '',
        receivedFromName: '',
        receivedFromEmail: '',
        poStartDate: new Date(),
        poEndDate: new Date(),
        budget: '',
        currency: 'USD',
      });
      setTalents([{ ...initialTalent, id: 1 }]);
      alert("Data Saved Successfully...");

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div id='body'>
      

      <div id='main'>
        <div id='PurchessOrder'>
          <div className="container">
            <div className="card p-4 shadow">
              <h2 className="mb">Purchase Order | New</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="clientName" className="form-label">Client Name *</label>
                    <select
                      id="clientName"
                      name="clientName"
                      className="form-select"
                      value={formState.clientName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select Client</option>
                      <option value="Collabera">Collabera - Collabera Inc</option>
                      <option value="AnotherClient">Another Client</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="poType" className="form-label">Purchase Order Type *</label>
                    <select
                      id="poType"
                      name="poType"
                      className="form-select"
                      value={formState.poType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="Group PO">Group PO</option>
                      <option value="Individual PO">Individual PO</option>
                    </select>
                  </div>
                </div>

                {/* PO Details */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="poNumber" className="form-label">Purchase Order No. *</label>
                    <input
                      type="text"
                      id="poNumber"
                      name="poNumber"
                      className="form-control"
                      value={formState.poNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="PO Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="receivedOn" className="form-label">Received On *</label>
                    <input
                      type="date"
                      id="receivedOn"
                      name="receivedOn"
                      className="form-control"
                      value={formState.receivedOn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-md-6'>
                    <label htmlFor="receivedFromEmail" className="form-label">Received From Email*</label>
                    <input
                      type="email"
                      id="receivedFromEmail"
                      name="receivedFromEmail"
                      placeholder='ReceivedFromEmail...'
                      className='form-control'
                      value={formState.receivedFromEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor="receivedFromName" className="form-label">Received From Name*</label>
                    <input
                      type="text"
                      id="receivedFromName"
                      name="receivedFromName"
                      placeholder='receivedFromName'
                      className='form-control'
                      value={formState.receivedFromName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* PO Date Pickers */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="poStartDate" className="form-label">PO Start Date *</label>
                    <DatePicker
                      selected={formState.poStartDate}
                      onChange={(date) => handleDateChange('poStartDate', date)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="poEndDate" className="form-label">PO End Date *</label>
                    <DatePicker
                      selected={formState.poEndDate}
                      onChange={(date) => handleDateChange('poEndDate', date)}
                      className="form-control"
                      required
                    />
                    {errors.poEndDate && <div className="text-danger">{errors.poEndDate}</div>}
                  </div>
                </div>

                {/* Budget and Currency */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="budget" className="form-label">Budget *</label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      className="form-control"
                      value={formState.budget}
                      onChange={handleInputChange}
                      required
                      max="99999"
                      placeholder="Budget"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="currency" className="form-label">Currency *</label>
                    <select
                      id="currency"
                      name="currency"
                      className="form-select"
                      value={formState.currency}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="USD">USD - Dollars ($)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-end">
                  <button type="reset" className="btn btn-light me-2">Reset</button>
                  <button type="submit" className="btn btn-primary me-2">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <AddTalentDetail />

      </div>

    </div>
  );
};

export default PurchaseOrderForm;
