import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const InvoiceListing = () => {
    const [invoiceData, invoiceDataChange] = useState(null);
    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate("/employee/edit/"+ id);
    }

    const removeItem = (id) => {
        if(window.confirm("Do you want to remove invoice?")) {
            fetch("http://localhost:8000/invoice/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/invoice").then((res) => {
            return res.json();
        }).then((resp) => {
            invoiceDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Invoice Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="invoice/create" className="btn btn-success mb-3">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Client Name</td>
                                <td>Total Amount</td>
                                <td>Due Date</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            { invoiceData &&
                                invoiceData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <a onClick={() => loadEdit(item.id)} className="btn btn-success">Edit</a>
                                            <a onClick={() => removeItem(item.id)} className="btn btn-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InvoiceListing;