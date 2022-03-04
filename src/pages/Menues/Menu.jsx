import React, { useState } from "react";
import { Input } from "../Login/LoginElements";
import axios from "axios";
import { BaseUrl } from "../../helpers/base_url";
import Table from "../../components/table/Table";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const [openAddCategorie, setopenAddCategorie] = useState(false);
  const [categorietoadd, setcategorietoadd] = useState("");
  const [listCategories, setlistCategories] = useState([]);
  const [listMeal, setlistMeal] = useState([]);
  const [categorieTitle, setcategorieTitle] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const [dataReady, setdataReady] = useState(false);
  const [openMealDetail, setopenMealDetail] = useState(false);
  const [openIngredientLis, setopenIngredientLis] = useState(false);
  const [ingrediantList, setingrediantList] = useState([]);
  const [openaddMeal, setopenaddMeal] = useState(false);
  const [mealtoAdd, setmealtoAdd] = useState({
    name: "",
    price: 0,
    discount: 0,
    duration: 0,
    hotMeal: false,
    description: "",
  });
  const [meal, setmeal] = useState({
    name: "",
    price: 0,
    discount: 0,
    duration: 0,
    hotMeal: false,
    description: "",
  });
  const doopeningrediantList = () => {
    setopenIngredientLis(!openIngredientLis);
  };
  const customerTableHead = ["", "name", ""];
  const mealTableHead = ["", "name", "Description"];
  const ingrediantTableHead = ["name"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderIngrediantHead = (item, index) => (
    <th key={index} className=" col-1">
      {item}
    </th>
  );

  const openEditCatfore = async (categorie) => {
    setopenEdit(false);
    setopenMealDetail(false);

    await setlistMeal(categorie.meals);
    setcategorieTitle(categorie.name);
    setopenEdit(true);
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td></td>
      <td>{item.name}</td>
      <td>
        <button onClick={() => openEditCatfore(item)} className="button col-6">
          Edit
        </button>
      </td>
    </tr>
  );
  const opedEditMeal = async (onemeal) => {
    setopenMealDetail(false);
    await setingrediantList(onemeal.ingrediants[0]);
    setmeal({
      name: onemeal.name,
      price: onemeal.price,
      discount: onemeal.discount,
      duration: onemeal.duration,
      hotMeal: onemeal.hotMeal,
      description: onemeal.description,
    });
    setopenMealDetail(true);
  };
  const renderIngrediantBody = (item, index) => (
    <tr key={index}>
      <td className=" col-1">{item}</td>

      <td>
        <button className="button col-3">Edit</button>
      </td>
    </tr>
  );

  const renderMealBody = (item, index) => (
    <tr key={index}>
      <td></td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>
        <button className="button col-10" onClick={() => opedEditMeal(item)}>
          Detail
        </button>
      </td>
    </tr>
  );
  const history = useHistory();
  if (localStorage.getItem("auth") != "true") {
    //check condition
    history.push("/login");
  }
  React.useEffect(async () => {
    await axios
      .get(
        BaseUrl +
          "/menu/getbyrestaurant/" +
          localStorage.getItem("restaurant_id")
      )
      .then((response) => {
        setlistCategories(response.data["categories"]);
        setdataReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const doOpenAddCategorie = () => {
    setopenAddCategorie(true);
  };
  const doCloseAddMeal = () => {
    setopenaddMeal(false);
  };
  const doOpenAddMeal = () => {
    setopenaddMeal(true);
  };
  const doCloseopenAddCategorie = () => {
    setopenAddCategorie(false);
  };
  const addCategorie = () => {
    axios
      .post(
        BaseUrl + "/categories/createwithoutMeals",
        {
          name: categorietoadd,
        },
        {
          headers: { restaurantid: localStorage.getItem("restaurant_id") },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          listCategories.push({ name: res.data["name"] });
          doCloseopenAddCategorie();
          setcategorietoadd("");
          setdataReady(false);
          setcategorieTitle(res.data["name"]);
          setmeal(res.data);
          setopenEdit(true);
          setdataReady(true);
        }
        console.log(res);
      });
  };
  const closedEditMeal = () => {
    setopenMealDetail(false);
  };
  const DoaddMeal = () => {
    axios
      .post(
        BaseUrl + "/meal/create",
        {
          name: mealtoAdd.name,
        },
        {
          headers: {
            restaurantid: localStorage.getItem("restaurant_id"),
            categoryname: categorieTitle,
          },
        }
      )
      .then(async (res) => {
        if (res.status == 201) {
          doCloseAddMeal();
          setmealtoAdd({});
          setopenEdit(false);
          await setlistMeal((listMeal) => [...listMeal, res.data]);
          setopenEdit(true);
        }
      });
  };
  return (
    <div>
      <h2 className="page-header">Menu</h2>
      <div className="row">
        <h3 className="page-header col-3">Categories list</h3>
        <button className="button col-2" onClick={doOpenAddCategorie}>
          Add Categorie
        </button>
      </div>
      {openAddCategorie ? (
        <div className="row">
          <div className="col-6">
            <div className="card">
              <label>Categorie name</label>
              <br />
              <Input
                type="text"
                placeholder="Categorie"
                value={categorietoadd}
                onChange={(e) => setcategorietoadd(e.target.value)}
              />
              <div className="row">
                <div className="col-3">
                  {" "}
                  <button className="button col-12" onClick={addCategorie}>
                    submit
                  </button>
                </div>
                <div className="col-3">
                  <button
                    className="button col-12"
                    onClick={doCloseopenAddCategorie}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="row">
        <div className="col-5">
          <div className="card">
            <div className="card__body">
              {dataReady ? (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listCategories}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          {openMealDetail ? (
            <div className="card">
              <div className="card__body">
                <div className="row">
                  <div className="col-4">
                    <h4>Meal name : </h4>
                    <p>{meal.name}</p>
                    <h4>Meal description : </h4>
                    <p>{meal.description} </p>
                    <h4>Meal price : </h4>
                    <p>{meal.price} DT</p>
                    <h4>Meal duration : </h4>
                    <p>{meal.duration} min</p>
                    <h4>Meal discount : </h4>
                    <p>{meal.discount} %</p>
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-8">
                        {" "}
                        <button
                          onClick={doopeningrediantList}
                          className="button col-8"
                        >
                          toggle ingrediants
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          className="button col-8"
                          onClick={() => closedEditMeal()}
                        >
                          close
                        </button>
                      </div>
                    </div>

                    {openIngredientLis ? (
                      <div>
                        <br />{" "}
                        <button className="button col-5">
                          add ingrediants
                        </button>
                        <Table
                          limit="10"
                          headData={ingrediantTableHead}
                          renderHead={(item, index) =>
                            renderIngrediantHead(item, index)
                          }
                          bodyData={ingrediantList}
                          renderBody={(item, index) =>
                            renderIngrediantBody(item, index)
                          }
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {openEdit ? (
            <div className="card">
              <div className="card__body">
                <h3>{categorieTitle}</h3>
                <br></br>
                <div className="row">
                  <div className="col-6">
                    <h4>Meals list :</h4>
                  </div>

                  <div className="col-6">
                    <button className="button col-6" onClick={doOpenAddMeal}>
                      Add Meal
                    </button>
                  </div>
                </div>
                {openaddMeal ? (
                  <div className="col-12">
                    <br />

                    <label>Meal name</label>
                    <br />
                    <br />
                    <Input
                      type="text"
                      placeholder="Meal name"
                      value={mealtoAdd["name"]}
                      onChange={(e) => setmealtoAdd({ name: e.target.value })}
                    />
                    <br />

                    <label>Meal description</label>
                    <br />
                    <br />
                    <Input
                      type="text"
                      placeholder="Meal description"
                      value={mealtoAdd.description}
                      onChange={(e) =>
                        setmealtoAdd({ description: e.target.value })
                      }
                    />

                    <label>
                      <br />

                      <label>Meal price</label>
                      <br />
                      <br />
                      <Input
                        type="number"
                        placeholder="Meal price"
                        value={mealtoAdd.price}
                        onChange={(e) =>
                          setmealtoAdd({ price: e.target.value })
                        }
                      />
                    </label>
                    <br />

                    <label>Meal duration</label>
                    <br />
                    <br />

                    <Input
                      type="number"
                      placeholder="Meal duration"
                      value={mealtoAdd.duration}
                      onChange={(e) =>
                        setmealtoAdd({ duration: e.target.value })
                      }
                    />
                    <br />

                    <label>Meal discount</label>
                    <br />
                    <br />

                    <Input
                      type="number"
                      placeholder="Meal discount"
                      value={mealtoAdd.discount}
                      onChange={(e) =>
                        setmealtoAdd({ discount: e.target.value })
                      }
                    />
                    <div className="row">
                      <div className="col-3">
                        {" "}
                        <button className="button col-12" onClick={DoaddMeal}>
                          submit
                        </button>
                      </div>
                      <div className="col-3">
                        <button
                          className="button col-12"
                          onClick={doCloseAddMeal}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <br />
                {dataReady ? (
                  <Table
                    limit="10"
                    headData={mealTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={listMeal}
                    renderBody={(item, index) => renderMealBody(item, index)}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Menu;
