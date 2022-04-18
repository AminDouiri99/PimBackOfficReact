import React, { useState } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import axios from "axios";
import socketIOClient from "socket.io-client";
import { BaseUrl } from "../../helpers/base_url";

import user_image from "../../assets/images/tuat.png";

import user_menu from "../../assets/JsonData/user_menus.json";
import { useHistory } from "react-router-dom";
const SERVER = "http://127.0.0.1:4000";

const Topnav = () => {
  const [listNotif, setlistNotif] = useState([]);
  const [dataReady, setdataReady] = useState(false);
  const [notifNumber, setnotifNumber] = useState(0);
  React.useEffect(async () => {
    var socket = socketIOClient(SERVER);
    socket.on(
      "newcommand" + localStorage.getItem("restaurant_id"),
      (command) => {
        setnotifNumber(notifNumber + 1);
        setlistNotif((prev) => [command, ...prev]);
      }
    );

    await axios
      .get(
        BaseUrl +
          "/command/getall/byrestaurantid/" +
          localStorage.getItem("restaurant_id")
      )
      .then((response) => {
        setlistNotif(response.data);
        setdataReady(true);
      });
    return () => socket.disconnect();
  }, []);
  const curr_user = {
    display_name:
      localStorage.getItem("firstname") +
      " " +
      localStorage.getItem("lastname"),
    image: user_image,
  };

  const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
      <i className="bx bx-cart"></i>
      <span>New Order {item["price"]} DT</span>
    </div>
  );

  const renderUserToggle = (user) => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={user.image} alt="" />
      </div>
      <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
  );
  const history = useHistory();

  const actionMenu = (item) => {
    console.log("aaaaaa");
    if (item == "Logout") {
      localStorage.clear();
      history.push("/login");
    }
  };
  const renderUserMenu = (item, index) => (
    <Link key={index} onClick={() => actionMenu(item.content)}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );
  const showNotif = () => {};
  return (
    <div className="topnav">
      <div className="topnav__search"></div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          {dataReady ? (
            <div onClick={showNotif}>
              <Dropdown
                icon="bx bx-bell"
                badge={notifNumber}
                contentData={listNotif.slice(0, 5)}
                renderItems={(item, index) =>
                  renderNotificationItem(item, index)
                }
                renderFooter={() => <Link to="/orders">View All</Link>}
              />
            </div>
          ) : (
            <div></div>
          )}

          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
