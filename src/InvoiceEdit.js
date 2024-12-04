import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const InvoiceEdit = () => {
    const { invid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/invoice/" + invid).then((res) => {
            return res.json();
        }).then((resp) => {
            idChange(resp.id);
            nameChange(resp.name);
            amountChange(resp.amount);
            dateChange(resp.date);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [amount, amountChange] = useState("");
    const [date, dateChange] = useState("");
    const [validation, valChange] = useState(false);


    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const invoiceData={id,name,amount,date};
  
        fetch("http://localhost:8000/invoice/" + invid,{
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(invoiceData)
        }).then((res)=>{
          alert('Saved successfully.')
          navigate('/');
        }).catch((err)=>{
          console.log(err.message)
        })
      }

    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Invoice Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                            <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>

                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e=>valChange(true)} onChange={e => nameChange(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Amount</label>
                                            <input required value={amount} onChange={e => amountChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input required value={date} onChange={e => dateChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Update</button>
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
 
export default InvoiceEdit;