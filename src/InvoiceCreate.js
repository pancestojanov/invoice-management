import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InvoiceCreate = () => {

    const [clients, setClients] = useState(['Panche', 'Mark', 'John', 'Steven', 'Jackson']);

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [amount, amountChange] = useState("");
    const [date, dateChange] = useState("");
    const [validation, valChange] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoiceData = {name, amount, date};

        fetch("http://localhost:8000/invoice", {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(invoiceData)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{"textAlign":"left"}}>

                            <div className="card-title">
                                <h2>Invoice Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control" placeholder="ID is auto-generated"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                                <label>Select Client</label>
                                                <select required value={name} onMouseDown={e=>valChange(true)} onChange={e=>nameChange(e.target.value)} className="form-control">
                                            
                                                {clients.map(client => 
                                                    <option>
                                                        {client}
                                                    </option>
                                                )}
            
                                            </select>
                                        </div>   
                                    </div>                                 

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Total Amount</label>
                                            <input type="number" required value={amount} onChange={e => amountChange(e.target.value)} className="form-control"></input>
                                            
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Due Date</label>
                                            <input type="date" required value={date} onChange={e => dateChange(e.target.value)} className="form-control"></input>
                                            
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mt-3">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InvoiceCreate;