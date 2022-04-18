import React from "react";
import Badge from "../../components/badge/Badge";

import axios from "axios";
import { BaseUrl } from "../../helpers/base_url";
import Table from "../../components/table/Table";
import socketIOClient from "socket.io-client";
import { useState } from "react";
const SERVER = "http://localhost:4000";

const Orders = () => {
  const [listOrder, setlistOrder] = useState([]);
  const [dataReady, setdataReady] = useState(false);
  const [newOrdersList, setnewOrdersList] = useState([]);
  const customerTableHead = ["date", "note", "price", "meal number", "Etat"];

  const orderStatus = {
    "non confirmer": "warning",
    Completed: "success",
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td className=" col-4">{item.createdAt}</td>

      <td className=" col-2">{item.note}</td>

      <td className=" col-2">{item.price}</td>

      <td className=" col-2">{item.meals.length}</td>
      <td>
        <Badge type={orderStatus[item.etat]} content={item.etat} />
      </td>
    </tr>
  );
  const getmealbyId = (id) => {};
  React.useEffect(async () => {
    var socket = socketIOClient(SERVER);
    socket.on(
      "newcommand" + localStorage.getItem("restaurant_id"),
      (command) => {
        setnewOrdersList((newOrdersList) => [...newOrdersList, command]);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      }
    );

    await axios
      .get(
        BaseUrl +
          "/command/getall/byrestaurantid/" +
          localStorage.getItem("restaurant_id")
      )
      .then((response) => {
        //   console.log(response.data);
        setlistOrder(response.data);
        setdataReady(true);
      });
    return () => socket.disconnect();
  }, []);
 /*  const renderNewOrder = (item) => {
    <div className="card col-8">
      <div className="card__body">
        <div className="row">
          <div className="col-4">
            {" "}
            <h3>New Order</h3>
          </div>
          <div className="col-4">
            <button className="button col-6">Accept</button>
          </div>
        </div>
        <br />
        <h4>Note :</h4>
        <p>{item.note}</p>
        <br />

        <h4>Meal List :</h4>
        {item.meals.map((item) => (
          <p>{item.name}</p>
        ))}
        <br />

        <h4>Price :</h4>
        <p>{item.price}</p>
      </div>
    </div>;
  }; */

  return (
    <div className="col-12">
      <h2 className="page-header">Orders</h2>
      <br />
      <div>
        {newOrdersList.sort().map((item) => (
          <div className="card col-8">
            <div className="card__body">
              <div className="row">
                <div className="col-4">
                  {" "}
                  <h3>New Order</h3>
                </div>
                <div className="col-4">
                  <button className="button col-6">Accept</button>
                </div>
              </div>
              <br />
              <h4>Note :</h4>
              <p>{item.note}</p>
              <br />

              <h4>Meal List :</h4>
              {item.meals.sort().map((meal) => (
                <p>{meal.name} </p>
              ))}
              <br />

              <h4>Price :</h4>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
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
  );
};

export default Orders;
