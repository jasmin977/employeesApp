import React from "react";
import { Link,useParams } from 'react-router-dom';

function Employee({}) {
  const paramsId = useParams();

  if (!paramsId) {
    return <div>Loading...</div>;
  }
  return( 
  <div>
  <br />
  <Link className="btn btn-info" to="/employees">Back To Index</Link>
  <h3>{paramsId}dd</h3>
</div>)
}

export default Employee;
