import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function registrationElement({ reg,isOndb  }) {
  const [select, setSelect] = useState("select");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("registartion", select);
    try {
      const deleteItem = await axios
        .delete("http://localhost:3001/tracing", {
          data: { codTicket: select },
        })
        .then((res) => {
          console.log("res delete", res.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log("error axios tracing", error);
    }
  };

  const deleted = !reg.ondb ? (
    <span>
      <span className="fs-6">
        <del>ticket: {reg.ticket}</del>{" "}
      </span>
      <span>
        {" "}
        <del> date: {reg.date}</del>
      </span>
    </span>
  ) : (
    <span>
      <span className="fs-6"> ticket: {reg.ticket}</span>
      <span> date: {reg.date} {reg.ondb}</span>
    </span>
  );
  /* "text-muted" */
  useEffect(() => {
    
    console.log(reg.ondb);
    return () => {
      /* cleanup */
    };
  }, [reg.ondb]);

  return (
    <form onSubmit={handleSubmit}>
      <li className="list-group-item d-flex justify-content-between">
        {deleted}
        <button
          type="submit"
          className="btn btn-danger btn-sm"
          onClick={() => {
            setSelect(reg.ticket);
            isOndb(false);
            console.log(reg)
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </li>
    </form>
  );
}

export default registrationElement;
