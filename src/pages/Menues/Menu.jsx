import React, { useState } from "react";
import { Input } from "../Login/LoginElements";
import axios from "axios";
import { BaseUrl } from "../../helpers/base_url";
import Table from "../../components/table/Table";
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';


const InputFile = styled('input')({
  display: 'none',
});
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
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
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileMeal, setSelectedFileMeal] = React.useState(null);

  const [displayCategoryImage, setDisplayCategoryImage] = useState(false);
  const [CategoryImageUrl, setCategoryImageUrl] = useState("");

  const [displayMealImage, setDisplayMealImage] = useState(false);
  const [MealImageUrl, setMealImageUrl] = useState("");



  const handleFileSelectMeal = (event) => {
    setSelectedFileMeal(event.target.files[0]);
    setMealImageUrl(URL.createObjectURL(event.target.files[0]));
    setDisplayMealImage(true);
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);

    setCategoryImageUrl(URL.createObjectURL(event.target.files[0]));
    setDisplayCategoryImage(true);
  };
  const [erroraddingrediant, seterroraddingrediant] = useState(false);
  const [ingrediantToNewMeal, setingrediantToNewMeal] = useState();
  const [addIngrediantToExist, setaddIngrediantToExist] = useState(false);
  const [ingrediantlistNew, setingrediantlistNew] = useState([]);
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
  const customerTableHead = ["Categories"];
  const mealTableHead = ["name", "delete"];
  const ingrediantTableHead = ["name", "delete"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderIngrediantHead = (item, index) => (
    <th key={index} className=" col-1">
      {item}
    </th>
  );

  const openEditCatfore = async (categorie) => {
    setopenEdit(false);
    setopenMealDetail(false);
    if (categorie.meals != undefined) {
      await setlistMeal(categorie.meals);
    }
    setcategorieTitle(categorie.name);
    setopenEdit(true);
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>

        <ImageButton
          focusRipple
          key={item.name}
          style={{
            width: "100%",
          }}
          onClick={() => openEditCatfore(item)}
        >
          <ImageSrc style={{ backgroundImage: `url('${item.image}')` }} alt={"image"} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {item.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>

      </td>


    </tr>
  );
  const opedEditMeal = async (onemeal) => {
    setopenMealDetail(false);
    await setingrediantList(onemeal.ingrediants);
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
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>

      </td>
    </tr>
  );
  const deleteMeal = (meal) => { };
  const renderMealBody = (item, index) => (
    <tr key={index}>
      <td><ImageButton
        focusRipple
        key={item.name}
        style={{
          width: "100%",
        }}
        onClick={() => opedEditMeal(item)}
      >
        <ImageSrc style={{ backgroundImage: `url('${item.image}')` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {item.name}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton></td>

      <td>

        <Button variant="outlined" color="error" onClick={() => deleteMeal(item)} startIcon={<DeleteIcon />}>
          Delete
        </Button>

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
        console.log(response.data["categories"])
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
    setMealImageUrl("");
    setDisplayMealImage(false);
  };
  const doOpenAddMeal = () => {
    setopenaddMeal(true);
  };
  const doCloseopenAddCategorie = () => {
    setopenAddCategorie(false);
    setCategoryImageUrl("")
    setDisplayCategoryImage(false)
  };
  const addCategorie = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", categorietoadd);
    axios
      .post(BaseUrl + "/categories/createwithoutMeals", formData, {
        headers: { restaurantid: localStorage.getItem("restaurant_id") },
      })
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
      });
  };
  const closedEditMeal = () => {
    setopenMealDetail(false);
  };
  const addIngrediantToNewMeal = async () => {
    await setingrediantlistNew((prev) => [...prev, ingrediantToNewMeal]);
    setopenaddMeal(false);
    setingrediantToNewMeal("");
    setopenaddMeal(true);
  };
  const DoaddMeal = () => {
    if (ingrediantlistNew.length > 0) {
      const formData = new FormData();
      formData.append("image", selectedFileMeal);
      formData.append("price", mealtoAdd.price);
      formData.append("discount", mealtoAdd.discount);
      formData.append("duration", mealtoAdd.duration);
      formData.append("name", mealtoAdd.name);
      formData.append("hotMeal", false);
      formData.append("description", mealtoAdd.description);
      ingrediantlistNew.forEach((e) => {
        formData.append("ingrediants", e);
      });

      console.log(ingrediantlistNew);
      axios
        .post(BaseUrl + "/meal/create", formData, {
          headers: {
            restaurantid: localStorage.getItem("restaurant_id"),
            categoryname: categorieTitle,
          },
        })
        .then(async (res) => {
          if (res.status == 201) {
            doCloseAddMeal();
            setmealtoAdd({});
            setopenEdit(false);
            setingrediantlistNew([]);
            await setlistMeal((listMeal) => [...listMeal, res.data]);
            setopenEdit(true);
          }
        });
    } else {
      seterroraddingrediant(true);
    }
  };
  const openAddIngreDiantsToExistant = () => {
    setaddIngrediantToExist(true);
  };
  return (
    <div>
      <h2 className="page-header">Menu</h2>
      <div className="row">
        <h3 className="page-header col-3">Categories list</h3>

        <Button sx={{
          "border-radius": "32px",
          "width": "auto",
          "background": "#f44749"
        }}
          variant="contained"
          onClick={doOpenAddCategorie}
          color="error"
          startIcon={<AddCircleIcon />}>
          Add Categorie
        </Button>
      </div>
      {openAddCategorie ? (
        <div className="row">
          <div className="col-6">
            <div className="card">
              <TextField
                placeholder="Categorie name"
                value={categorietoadd}
                onChange={(e) =>
                  setcategorietoadd(e.target.value)
                }
                sx={{
                  input: { color: "#ffffff" }
                }}
                InputLabelProps={{
                  sx: {
                    // set the color of the label when not shrinked
                    color: "#ffffff",
                  },
                }}
                id="outlined-basic" label="Categorie name" variant="outlined" />

              <div className="row">
                <label htmlFor="contained-button-file">
                  <InputFile accept="image/*" id="contained-button-file" type="file" onChange={handleFileSelect} />
                  <Button sx={{
                    "border-radius": "32px",
                    "width": "auto",
                    "background": "#f44749"
                  }} color="error"
                    variant="contained" component="span">
                    Categorie Image
                  </Button>
                </label>
                {displayCategoryImage ? (<Avatar
                  alt="Remy Sharp"
                  src={CategoryImageUrl}
                  sx={{ width: 300, height: 300 }}
                />) : (<div></div>)}
              </div>
              <br></br>


              <div className="row">
                <div className="col-3">
                  {" "}

                  <Button sx={{
                    "border-radius": "32px",
                    "width": "auto",
                    "background": "#f44749"
                  }} color="error" variant="contained" onClick={addCategorie} endIcon={<SendIcon />}>
                    submit
                  </Button>
                </div>
                <div className="col-3">
                  <Button sx={{
                    "border-radius": "32px",
                    "width": "auto",
                    "background": "#f44749"
                  }} color="error" variant="contained" onClick={doCloseopenAddCategorie} endIcon={<CancelIcon />}>
                    cancel
                  </Button>

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
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        // set the color of the label when not shrinked


                      }}
                    >
                      <ListItem>
                        <ListItemText primary="Meal name :" secondary={<Typography
                          sx={{ mt: 0.5, ml: 2 }}
                          color="#ffffff"
                          display="block"
                          variant="caption"
                        >{meal.name} </Typography>} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary="Meal description :" secondary={<Typography
                          sx={{ mt: 0.5, ml: 2 }}
                          color="#ffffff"
                          display="block"
                          variant="caption"
                        >{meal.description} </Typography>} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary="Meal price :" secondary={<Typography
                          sx={{ mt: 0.5, ml: 2 }}
                          color="#ffffff"
                          display="block"
                          variant="caption"
                        >{meal.price} DT</Typography>} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary="Meal duration :" secondary={<Typography
                          sx={{ mt: 0.5, ml: 2 }}
                          color="#ffffff"
                          display="block"
                          variant="caption"
                        >{meal.duration} min</Typography>} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary="Meal discount :" secondary={<Typography
                          sx={{ mt: 0.5, ml: 2 }}
                          color="#ffffff"
                          display="block"
                          variant="caption"
                        >{meal.discount} %</Typography>} />
                      </ListItem>

                    </List>


                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-8">
                        {" "}

                        <Button sx={{
                          "border-radius": "32px",
                          "width": "auto",
                          "background": "#f44749"
                        }}
                          variant="contained"
                          onClick={doopeningrediantList}
                          color="error"
                        >
                          toggle ingrediants
                        </Button>
                      </div>
                      <div className="col-4">

                        <Button sx={{
                          "border-radius": "32px",
                          "width": "auto",
                          "background": "#f44749"
                        }} color="error" variant="contained" onClick={closedEditMeal} endIcon={<CancelIcon />}>
                          close
                        </Button>
                      </div>
                    </div>

                    {openIngredientLis ? (
                      <div>
                        <br />{" "}

                        <Button sx={{
                          "border-radius": "32px",
                          "width": "auto",
                          "background": "#f44749"
                        }}
                          variant="contained"
                          onClick={openAddIngreDiantsToExistant}
                          color="error"
                          startIcon={<AddCircleIcon />}>
                          add ingrediants
                        </Button>
                        <br />
                        <br />
                        {addIngrediantToExist ? (
                          <div>
                            <br />
                            <br />
                            <TextField
                              placeholder="Ingredient"


                              sx={{
                                input: { color: "#ffffff" }
                              }}
                              InputLabelProps={{
                                sx: {
                                  // set the color of the label when not shrinked
                                  color: "#ffffff",
                                },
                              }}
                              id="outlined-basic" label="Ingredient" variant="outlined" />
                            <Button sx={{
                              "border-radius": "32px",
                              "width": "auto",
                              "background": "#f44749"
                            }} color="error" variant="contained" endIcon={<SendIcon />}>
                              submit
                            </Button>
                            <br />
                            <br />
                          </div>
                        ) : (
                          <div></div>
                        )}
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


                  <Button sx={{
                    "border-radius": "32px",
                    "width": "auto",
                    "background": "#f44749"
                  }}
                    variant="contained"
                    onClick={doOpenAddMeal}
                    color="error"
                    startIcon={<AddCircleIcon />}>
                    Add Meal
                  </Button>

                </div>
              </div>
              {openaddMeal ? (
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <br />


                      <TextField
                        placeholder="Meal name"
                        value={mealtoAdd.name}
                        onChange={(e) =>
                          setmealtoAdd((prev) => ({
                            name: e.target.value,
                          }))
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Meal name" variant="outlined" />

                      <br /><br />
                      <TextField
                        placeholder="Meal description"
                        value={mealtoAdd.description}
                        onChange={(e) =>
                          setmealtoAdd((prev) => ({
                            name: prev.name,
                            description: e.target.value,
                          }))
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Meal description" variant="outlined" />
                      <br></br><br></br>
                      <TextField
                        placeholder="Meal price"
                        value={mealtoAdd.price}
                        onChange={(e) =>
                          setmealtoAdd((prev) => ({
                            name: prev.name,
                            description: prev.description,
                            price: e.target.value,
                          }))
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Meal price" variant="outlined" />

                      <br /><br></br>
                      <TextField
                        placeholder="Meal duration"
                        value={mealtoAdd.duration}
                        onChange={(e) =>
                          setmealtoAdd((prev) => ({
                            name: prev.name,
                            description: prev.description,
                            price: prev.price,
                            duration: e.target.value,
                          }))
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Meal duration" variant="outlined" />

                      <br /><br></br>
                      <TextField
                        placeholder="Meal discount"
                        value={mealtoAdd.discount}
                        onChange={(e) =>
                          setmealtoAdd((prev) => ({
                            name: prev.name,
                            description: prev.description,
                            price: prev.price,
                            duration: prev.duration,
                            discount: e.target.value,
                          }))
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Meal discount" variant="outlined" />


                      <br></br><br></br>

                      <label htmlFor="contained-button-file">
                        <InputFile accept="image/*" id="contained-button-file" type="file" onChange={handleFileSelectMeal} />
                        <Button sx={{
                          "border-radius": "32px",
                          "width": "auto",
                          "background": "#f44749"
                        }} color="error"
                          variant="contained" component="span">
                          Meal Image
                        </Button>
                      </label>
                      {displayMealImage ? (<Avatar
                        alt="Remy Sharp"
                        src={MealImageUrl}
                        sx={{ width: 300, height: 300 }}
                      />) : (<div></div>)}
                      {erroraddingrediant ? (
                        <p className="error">
                          You should at least add one ingrediant
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="col-6">
                      <br />
                      <h3>Ingrediants</h3>
                      <br />
                      <TextField
                        placeholder="Ingredient"
                        value={ingrediantToNewMeal}
                        onChange={(e) =>
                          setingrediantToNewMeal(e.target.value)
                        }
                        sx={{
                          input: { color: "#ffffff" }
                        }}
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "#ffffff",
                          },
                        }}
                        id="outlined-basic" label="Ingredient" variant="outlined" />

                      <br />
                      <br />

                      <Button sx={{
                        "border-radius": "32px",
                        "width": "auto",
                        "background": "#f44749"
                      }}
                        variant="contained"
                        onClick={addIngrediantToNewMeal}
                        color="error"
                        startIcon={<AddCircleIcon />}>
                        add ingrediants
                      </Button>
                      <br />
                      <br />

                      <Table
                        limit="10"
                        headData={ingrediantTableHead}
                        renderHead={(item, index) =>
                          renderIngrediantHead(item, index)
                        }
                        bodyData={ingrediantlistNew}
                        renderBody={(item, index) =>
                          renderIngrediantBody(item, index)
                        }
                      />
                    </div>
                    <br></br>
                  </div>
                  <br></br>

                  <div className="row">
                    <div className="col-3">
                      {" "}

                      <Button sx={{
                        "border-radius": "32px",
                        "width": "auto",
                        "background": "#f44749"
                      }} color="error" variant="contained" onClick={DoaddMeal} endIcon={<SendIcon />}>
                        submit
                      </Button>
                    </div>
                    <div className="col-3">
                      <Button sx={{
                        "border-radius": "32px",
                        "width": "auto",
                        "background": "#f44749"
                      }} color="error" variant="contained" onClick={doCloseAddMeal} endIcon={<CancelIcon />}>
                        cancel
                      </Button>

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
    </div >
  );
};
export default Menu;
