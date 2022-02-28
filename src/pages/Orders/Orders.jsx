import React from 'react'

import axios from "axios";
import { BaseUrl } from "../../helpers/base_url";
import Table from "../../components/table/Table";
import { useState } from 'react';
const Orders =()=>{
    const [listOrder,setlistOrder]=useState([])
    const [dataReady, setdataReady] = useState(false);

    const customerTableHead = [ "date", "note","price","meal number",""];
    const renderHead = (item, index) => <th key={index}>{item}</th>;
    const renderOrderBody = (item, index) => (
        <tr key={index} >
          <td className=" col-4">{item.createdAt}</td>
    
          <td className=" col-2">
              {item.note}
          </td>
          
          <td className=" col-2">
              {item.price}
          </td>
          
          <td className=" col-2">
              {item.meals.length}
          </td>
          
        </tr>
      );
    React.useEffect( async() => {
        await axios.get(BaseUrl+"/command/getall/byrestaurantid/"+localStorage.getItem("restaurant_id"))
       .then((response) => {
            console.log(response.data)
            setlistOrder(response.data)
            setdataReady(true)
       }
        )
    },[])
    return(
        
        <div className="col-12">
             <h2 className="page-header">
                Orders
            </h2>
            <div className="col-12">
            <div className="row">
            <div className="col-12">
          <div className="card">
            <div className="card__body">
              {dataReady ? (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listOrder}
                  renderBody={(item, index) => renderOrderBody(item, index)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          </div>
          </div>

        </div>
    </div>
    )

}

export default Orders
