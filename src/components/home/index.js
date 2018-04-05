import React from "react";
import { func, bool, string, object, arrayOf } from "prop-types";
import { compose, pure, lifecycle, withState } from "recompose";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Badge from "material-ui/Badge";
import Typography from "material-ui/Typography";
import Drawer from "material-ui/Drawer";
import Select from "material-ui/Select";
import IconButton from "material-ui/IconButton";
import Input, { InputLabel } from "material-ui/Input";
import MenuIcon from "material-ui-icons/Menu";
import { MenuItem } from "material-ui/Menu";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";
import CardList from "./cardList";
import "./index.less";
import TourRadar from "../../components/logo.png";
import Empty from "../../components/empty.png";

const departureCityStore = localStorage.getItem("departureCity");
const arrivalCityStore = localStorage.getItem("arrivalCity");
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4527A0",
      light: "#EDE7F6"
    },
    secondary: {
      main: "#D81B60"
    }
  }
});

Home.propTypes = {
  drawerOpened: bool,
  setVisibilityNotification: func.isRequired,
  notificationVisibility: bool,
  onOpenDrawer: func.isRequired,
  onSetArrivalCity: func.isRequired,
  onCloseNot: func.isRequired,
  onSetDepartureCity: func.isRequired,
  departureCity: string,
  countriesList: arrayOf(string),
  arrivalCity: arrayOf(string),
  data: arrayOf(object),
  upd: bool
};

Home.defaultProps = {
  drawerOpened: false,
  notificationVisibility: departureCityStore || arrivalCityStore,
  departureCity: "",
  countriesList: [],
  arrivalCity: [],
  data: [],
  upd: false
};

function Home({
  drawerOpened,
  onOpenDrawer,
  onCloseDrawer,
  departureCity,
  arrivalCity,
  countriesList,
  onSetDepartureCity,
  onSetArrivalCity,
  data,
  notificationVisibility,
  setVisibilityNotification,
  upd,
  onCloseNot
}) {
  return (
    <div className="root">
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            {arrivalCity[0] === "Везде" ? (
              <IconButton
                className="menuButton"
                color="inherit"
                aria-label="Menu"
                onClick={() => onOpenDrawer()}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <div>
                <IconButton
                  className="menuButton"
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => onOpenDrawer()}
                >
                  <MenuIcon />
                </IconButton>
                <Badge
                  badgeContent={Array.from(arrivalCity).length}
                  color="secondary"
                  className="badge"
                />
              </div>
            )}
            <img src={TourRadar} height={40} alt="" className="logo" />
          </Toolbar>
          <Drawer
            anchor="left"
            open={drawerOpened}
            children={
              <div className="drawer">
                <AppBar position="static">
                  <Toolbar>
                    <Typography
                      variant="title"
                      color="inherit"
                      className="drawer-toolbar"
                    >
                      Фильтры
                    </Typography>
                  </Toolbar>
                </AppBar>
                <div className="filter-item">
                  <InputLabel htmlFor="departure" className="input-label">
                    Откуда
                  </InputLabel>
                  <Select
                    value={departureCity}
                    onChange={event => onSetDepartureCity(event.target.value)}
                    autoWidth={true}
                    className="select-item"
                    inputProps={{
                      name: "departure",
                      id: "departure"
                    }}
                  >
                    <MenuItem value={"Россия"}>Россия</MenuItem>
                    <MenuItem value={"Москва"}>Москва</MenuItem>
                    <MenuItem value={"Санкт-Петербург"}>
                      Санкт-Петербург
                    </MenuItem>
                  </Select>
                </div>
                <div className="filter-item">
                  <InputLabel htmlFor="arrival" className="input-label">
                    Куда
                  </InputLabel>
                  <Select
                    multiple
                    value={Array.from(arrivalCity)}
                    onChange={event => onSetArrivalCity(event.target.value)}
                    autoWidth={true}
                    className="select-item"
                    input={<Input id="select-multiple" />}
                  >
                    <MenuItem value={"Везде"}>{"Везде"}</MenuItem>
                    {countriesList.map(item => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </div>
                <Button
                  variant="raised"
                  color="primary"
                  className="reset"
                  onClick={() => {
                    onSetArrivalCity(["Везде"]);
                    onSetDepartureCity("Россия");
                  }}
                >
                  Сбросить фильтры
                </Button>
                <InputLabel htmlFor="departure" className="email">
                  <a
                    href="mailto:helpme@turradar.ru?subject=TourRadar Web"
                    className="link"
                  >
                    helpme@turradar.ru
                  </a>
                </InputLabel>
              </div>
            }
            onClose={() => onCloseDrawer()}
            variant="temporary"
          />
        </AppBar>
        {data.length > 0 ? (
          <CardList data={data} />
        ) : (
          <div>
            <div className="emptyData">
              <img src={Empty} height={500} width={500} alt="" />
            </div>
            <InputLabel htmlFor="departure" className="input-label">
              Упс. Мы не нашли дешевых туров по вашему запросу, попробуйте
              ослабить фильтры.
            </InputLabel>
            <InputLabel htmlFor="departure" className="input-label">
              Если ничего не помогает, поищите туры напрямую на сайте{" "}
              <a
                href="https://c26.travelpayouts.com/click?shmarker=67204.zen&promo_id=660&source_type=customlink&type=click&custom_url=https%3A%2F%2Flevel.travel%2F"
                className="link"
              >
                level.travel
              </a>
            </InputLabel>
          </div>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={notificationVisibility}
          onClose={() => setVisibilityNotification(false)}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Последние настройки фильтров были восстановлены
            </span>
          }
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={upd}
          onClose={() => onCloseNot()}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          transitionDuration={{ enter: 5000 }}
          autoHideDuration={4000}
          message={<span id="message-id">База данных туров обнвлена</span>}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default compose(
  withState(
    "notificationVisibility",
    "setVisibilityNotification",
    departureCityStore !== null || arrivalCityStore !== null
  ),
  lifecycle({
    componentDidMount() {}
  }),
  pure
)(Home);