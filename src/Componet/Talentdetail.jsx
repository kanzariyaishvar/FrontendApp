import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Make sure the path is correct
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

const initialTalent = { id: 1, name: '', contractDuration: '', billRate: '', standardTimeBR: '', overTimeBR: '', currency: 'USD' };

const AddTalentDetail = () => {
  const [talents, setTalents] = useState([{ ...initialTalent }]);
  const [isPartOneVisible, setIsPartOneVisible] = useState(true); // Toggle state for parts
  const [Products, setProduct] = useState([]);
  const Collection = collection(db, 'PurchaseOrder'); // Accessing the 'PurchaseOrder' collection

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(Collection); // Use getDocs to fetch the collection data
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [Collection]);

  const handleTalentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTalents = talents.map((talent, i) =>
      i === index ? { ...talent, [name]: value } : talent
    );
    setTalents(updatedTalents);
  };

  const addTalent = () => {
    setTalents([
      ...talents,
      { ...initialTalent, id: talents.length + 1 },
    ]);
  };

  const removeTalent = (index) => {
    const updatedTalents = talents.filter((_, i) => i !== index);
    setTalents(updatedTalents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Talent Data:', talents);

    // Reset form state
    setTalents([{ ...initialTalent }]);
  };

  return (
    <div className="container">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setIsPartOneVisible(!isPartOneVisible)} // Toggle visibility on button click
      >
        {isPartOneVisible ? 'View Data' : 'Go Back'}
      </button>

      {isPartOneVisible ? (
        <div className="card p-4 shadow" id="part-1">
          <h2 className="mb-4">Add Talent Detail</h2>
          <form onSubmit={handleSubmit}>
            {talents.map((talent, index) => (
              <div key={talent.id} className="row align-items-center mb-3">
                <div className="col-md-2">
                  <label htmlFor={`talentName${talent.id}`}>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id={`talentName${talent.id}`}
                    value={talent.name}
                    onChange={(e) => handleTalentChange(index, e)}
                    placeholder="Talent Name"
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor={`contractDuration${talent.id}`}>Contract Duration</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contractDuration"
                    id={`contractDuration${talent.id}`}
                    value={talent.contractDuration}
                    onChange={(e) => handleTalentChange(index, e)}
                    placeholder="Contract Duration (Months)"
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor={`billRate${talent.id}`}>Bill Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    name="billRate"
                    id={`billRate${talent.id}`}
                    value={talent.billRate}
                    onChange={(e) => handleTalentChange(index, e)}
                    placeholder="Bill Rate"
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor={`standardTimeBR${talent.id}`}>Standard Time BR</label>
                  <input
                    type="number"
                    className="form-control"
                    name="standardTimeBR"
                    id={`standardTimeBR${talent.id}`}
                    value={talent.standardTimeBR}
                    onChange={(e) => handleTalentChange(index, e)}
                    placeholder="Standard Time BR"
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor={`overTimeBR${talent.id}`}>Over Time BR</label>
                  <input
                    type="number"
                    className="form-control"
                    name="overTimeBR"
                    id={`overTimeBR${talent.id}`}
                    value={talent.overTimeBR}
                    onChange={(e) => handleTalentChange(index, e)}
                    placeholder="Over Time BR"
                  />
                </div>
                <div className="col-md-1">
                  <label htmlFor={`talentCurrency${talent.id}`}>Currency</label>
                  <select
                    className="form-select"
                    name="currency"
                    id={`talentCurrency${talent.id}`}
                    value={talent.currency}
                    onChange={(e) => handleTalentChange(index, e)}
                  >
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeTalent(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={addTalent}
            >
              + Add Another Talent
            </button>
            <div className="mt-4 d-flex justify-content-end">
              <button type="reset" className="btn btn-light me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card p-4 shadow" id="part-2">
          <h2 className="mb-4">Purchase Orders</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ClientName</th>
                <th>Currency</th>
                <th>Budget</th>
                <th>PoNumber</th>
                <th>PoType</th>
                <th>ReceivedFromMaile</th>
                <th>ReceivedFromName</th>
                <th>ReceivedOn</th>
                {/* Add more columns as necessary */}
              </tr>
            </thead>
            <tbody>
              {Products.map((product) => (
                <tr key={product.id}>
                  <td>{product.clientName || 'N/A'}</td>
                  <td>{product.currency}</td>
                  <td>{product.budget || 'N/A'}</td>
                  {/* <td>{product.poEndDate || 'N/A'}</td> */}
                  <td>{product.poNumber}</td>
                  <td>{product.poType}</td>
                  <td>{product.receivedFromEmail}</td>
                  <td>{product.receivedFromName}</td>
                  <td>{product.receivedOn}</td>
                  {/* Add more product details here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddTalentDetail;
