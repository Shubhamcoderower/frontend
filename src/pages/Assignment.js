import React from "react";
import { useState } from "react";

const Assignment = () => {
  const[updatePutResponse , setUpdatePutResponse]=useState("")
  const [inputValue, setInputValue] = useState("");
  const [inputConfig, setInputConfig] = useState("");
  const [inputRemark, setInputRemark] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const[updateResponse , setUpdateResponse]=useState(false)
  const[updateErrorResponse , setUpdateErrorResponse]=useState(false)
  
  
  const getdata = async () => {
    setResponse("")
    if (!inputValue) {
      setResponse("Please enter a config ID");
      setLoading(false);
      setErrorLoading(true);
      return;
    }
    setLoading(false);
    setErrorLoading(false);
    try {
      const baseUrl = "http://localhost:8000/configurations/";
      const url = baseUrl + inputValue;
      const result = await fetch(url);
      const res = await result.json();

      if (Array.isArray(res)) {
        setResponse(res);
        setLoading(true);
        console.log(res);
      } else {
        setResponse("Please Enter Correct Config id like  1 , sourah which is available in database ");
        setErrorLoading(true);
      }
    } catch (error) {
      setResponse("Please start the backend code");
      setErrorLoading(true);
      console.log("function in catch block");
      console.log(error);
    }
  };

  const updateData = async () => {
    setUpdatePutResponse("")
    if (!inputConfig || !inputRemark) {
      setUpdatePutResponse("Please enter both a config ID and a remark");
      setUpdateErrorResponse(true);
      setUpdateResponse(false)
      return;
  }
    setUpdateResponse(false)
    setUpdateErrorResponse(false)
    const apidata = {
      remark: inputRemark,
    };
    try {
      const baseUrl = "http://localhost:8000/configurations/";
      const url = baseUrl + inputConfig;
        const result = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apidata),
      });
      const res = await result.json();
      if(res.message == "Success")
      {
        setUpdateResponse(true)
      }
      else{
      setUpdatePutResponse("Please Enter Correct Config id like  1 , sourah which is avaible in backend");
      setUpdateErrorResponse(true);
      }
    } catch (error) {
      setUpdatePutResponse("Please start the backend code");
      setUpdateErrorResponse(true);
      console.log("function in catch block");
      console.log(error);
    }
  };

  return (
    <div style={{ marginLeft: 50 }}>
      <div>
        <h4>Task 1 :</h4>
        <h1>Fetch Config</h1>
        <p>
          Config To Load (configId): <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        </p>
        <button type="submit" onClick={getdata}>
          Submit
        </button>

        {loading && (
          <div style={{ marginTop: 10 }}>
            <h4> Result : http://localhost:8000/configurations/{inputValue}</h4>

            {response.map((values, index) => (
              <div key={index}>{values.join(" ")}</div>
            ))}
          </div>
        )}
        {errorLoading && (
          <div style={{ marginTop: 10 }}>
            <h4 style={{ color: "red" }}>{response}</h4>
          </div>
        )}
      </div>
      <div>
        <h4>Task 2:</h4>
        <h1>Update Remark</h1>
        <p>
          Config To Update (configId): <input type="text" value={inputConfig} onChange={(event) => setInputConfig(event.target.value)} />
        </p>
        <p>
          Remark : <textarea name="" id="" cols="30" rows="4" value={inputRemark} onChange={(event) => setInputRemark(event.target.value)}></textarea>
        </p>
        <button type="submit" onClick={updateData}>
          Submit
        </button>

        {
          updateResponse && <div>
            <h4> PUT : http://localhost:8000/configurations/{inputConfig}</h4>
            <p>Success</p>
          </div>
        }
        {
          updateErrorResponse && 
          <div style={{ marginTop: 10 }}>
          <h4 style={{ color: "red" }}>{updatePutResponse}</h4>
        </div>
        }
      </div>
    </div>
  );
};

export default Assignment;
