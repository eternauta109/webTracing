import React, { useState, useEffect, useRef } from 'react';
import Accordion from './accordion';
import Table from './table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


export const Tracing = ({cinema}) => {
  /* const [codFisc, setCodFisc] = useState(''); */
  const codFisc = useRef('');
  const ticket = useRef('');
  
  const date = new Date().toLocaleString() + '';
  const agregato = useRef('');
  const number = useRef();
  const [counter, setCounter] = useState(0);
  const [registrer, setRegistrer] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('onSubmit');
    /* setCodFisc(event.currentTarget.codFisc.value); */
    /* console.log('cod fisc', codFisc.current.value);
    console.log('ticket', ticket.current.value);
    console.log('nome e cognome', agregato.current.value);
    console.log('numero tel', number.current.value); */
    if (!cinema){
      alert("fai prima il login grazie")
      return
    }

    if (
      !codFisc.current.value &&
      !agregato.current.value &&
      !number.current.value
    ) {
      toast.error(
        'inserire codice fiscale o nome, cognome e numero di telefono',
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    if (!ticket.current.value) {
      toast.error('si deve inserire il codice biglietto', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    
    try {
      const result = await axios.post("http://localhost:3001/tracing", 
      {            
          registration:{
            cinema:cinema,
            fiscale: codFisc.current.value,
            nameClient: agregato.current.value,
            numberPhone: number.current.value,
            ticket: ticket.current.value,
            date: date
          }
          
        
      }).then((res)=>{        
        if (res.data){
          console.log("res data",res.data);
        } else{
          alert("qualcosa è andato storto. Riprova")
        }
      }).catch((e)=>
        console.log(e)
      );
      
    } catch (error) {
      console.log("error axios tracing", error);
    }

    setCounter(counter + 1);
    console.log(counter)
   
    let newArrya = [...registrer];
    newArrya[counter] = {
      fiscale: codFisc.current.value,
      nameClient: agregato.current.value,
      numberPhone: number.current.value,
      ticket: ticket.current.value,
      date: date
    };

    setRegistrer(newArrya);

    
    if (counter === 2) {
      setCounter(0);
    }
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3" onSubmit={onSubmit}>
              <h4>Tracing</h4>
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={cinema}
                  aria-label="Disabled input example"
                  disabled
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  ref={codFisc}
                  tabIndex="0"
                  name="codFisc"
                  className="form-control"
                  placeholder="CODICE FISCALE"
                />
              </div>
              <div className="col-12">
                <Accordion num={number} nome={agregato} />
              </div>
              <div className="col-12">
                <input
                  type="ticket"
                  name="ticket"
                  tabIndex="1"
                  ref={ticket}
                  className="form-control"
                  placeholder="TICKET"
                />
              </div>
              <div className="col-12">
                <input
                  name="date"
                  className="form-control"
                  aria-label="Disabled input example"
                  placeholder="date"
                  value={date}
                  disabled
                />
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">
                  Register
                </button>
              </div>
            </form>
            <hr />
            <Table registration={registrer} />
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">dev by FC</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Tracing;
