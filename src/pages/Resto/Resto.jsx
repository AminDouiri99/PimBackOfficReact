import React from "react";
import axios from "axios";
import { BaseUrl } from "../../helpers/base_url";
import { useState } from "react";
import { Input } from "../Login/LoginElements";

import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Resto = () => {
  const data = new FormData();
  const [openupdate, setopenupdate] = useState(false);
  const [imgUpdate, setimgUpdate] = useState({});
  const [openEdit, setopenEdit] = useState(false);
  const [dataReady, setdataReady] = useState(false);
  const [restoData, setrestoData] = useState({
    name: "",
    description: "",
    location: [],
    speciality: "",
    image: "",
  });
  const [restoDataEdit, setrestoDataEdit] = useState({
    name: "",
    description: "",
    location: [],
    speciality: "",
    image: "",
  });
  const openEditRestofore = async (restaurant) => {
    setopenEdit(false);
    await setrestoData(restaurant);
    setopenEdit(true);
  };

  const UpdateRestau = async () => {
    data.append("image", imgUpdate);
    data.append("name", restoDataEdit.name);
    data.append("description", restoDataEdit.description);
    data.append("speciality", restoDataEdit.speciality);
    console.log(restoDataEdit);
    await axios
      .put(BaseUrl + "/restaurant/update", data, {
        headers: {
          restaurantId: localStorage.getItem("restaurant_id"),
        },
      })
      .then(async (res) => {
        if (res.status == 201) {
          doCloseupdate();
          setrestoData({});
          setopenEdit(false);
          //await setrestoData((restoData) => [...restoData, res.data]);
          setopenEdit(true);
        }
      });
  };
  React.useEffect(async () => {
    await axios
      .get(BaseUrl + "/restaurant/", {
        headers: {
          idrestaurant: localStorage.getItem("restaurant_id"),
        },
      })
      .then((response) => {
        //   console.log(response.data);
        if (response.status == 200) {
          console.log(response.data);
          setdataReady(true);
          setrestoData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const doCloseupdate = () => {
    console.log("aaa");
    setopenEdit(false);
  };

  return (
    <div>
      {dataReady ? (
        <div className="card col-8">
          <div className="row">
            <div className="col-3"></div>
            <img
              src={restoData.image}
              style={{ height: "250px", width: "250px" }}
            />
          </div>

          <br></br>

          <h3>Restaurant Name :</h3>
          <div> {restoData.name} </div>
          <br></br>
          <h3>Restaurant Description :</h3>
          <div> {restoData.description} </div>
          <br></br>
          <h3>Restaurant Speciality :</h3>

          <div> {restoData.speciality} </div>
          <br></br>
          <button
            onClick={() => openEditRestofore(restoData)}
            className="button col-2"
          >
            Edit
          </button>
          <br></br>
        </div>
      ) : (
        <div></div>
      )}
      {openEdit ? (
        <div className="card col-8">
          <br />

          <label>Restaurant name</label>
          <br />
          <br />
          <Input
            type="text"
            placeholder="Restaurant name"
            value={restoDataEdit["name"]}
            onChange={(e) => setrestoDataEdit({ name: e.target.value })}
          />
          <br />

          <label>Restaurant description</label>
          <br />
          <br />
          <Input
            type="text"
            placeholder="Restaurant description"
            value={restoDataEdit.description}
            onChange={(e) =>
              setrestoDataEdit((prev) => ({
                name: prev.name,
                description: e.target.value,
              }))
            }
          />

          <label>
            <br />

            <label>Restaurant speciality</label>
            <br />
            <br />
            <Input
              type="text"
              placeholder="Restaurant speciality"
              value={restoDataEdit.speciality}
              onChange={(e) =>
                setrestoDataEdit((prev) => ({
                  name: prev.name,
                  description: prev.description,
                  speciality: e.target.value,
                }))
              }
            />
          </label>
          <br />
          <label>
            Restaurant picture
            <br />
            <br />
            <input
              type="file"
              name="image"
              onChange={(e) => {
                console.log("image", e.target.files[0]);
                setimgUpdate(e.target.files[0]);
              }}
            />
          </label>
          <div className="row">
            <div className="col-3">
              {" "}
              <button className="button col-12" onClick={UpdateRestau}>
                Update
              </button>
            </div>
            <div className="col-3">
              <button className="button col-12" onClick={doCloseupdate}>
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Resto;
