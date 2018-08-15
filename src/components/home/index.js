import React from "react";
import { func, bool, string, object, arrayOf, number } from "prop-types";
import { compose, pure, lifecycle } from "recompose";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Select from "material-ui/Select";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import ExpansionPanel from "material-ui/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";
import IconButton from "material-ui/IconButton";
import { InputLabel } from "material-ui/Input";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import FilterList from "material-ui-icons/FilterList";
import HelpIcon from "material-ui-icons/Help";
import { MenuItem } from "material-ui/Menu";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import CardList from "./cardList";
import "./index.less";
import Empty from "../../components/empty.png";

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
  onSetArrivalCity: func.isRequired,
  onCloseNot: func.isRequired,
  onSetDepartureCity: func.isRequired,
  onSetNightsQuantity: func.isRequired,
  departureCity: string,
  countriesList: arrayOf(string),
  arrivalCity: string,
  data: arrayOf(object),
  upd: bool,
  loading: bool,
  handleCloseModal: func.isRequired,
  handleOpenModal: func.isRequired,
  modalVisibility: bool,
  nights: number.isRequired,
  onSetMonth: func.isRequired,
  onApplyFilters: func.isRequired,
  onToggleFilters: func.isRequired,
  filterOpened: bool
};

Home.defaultProps = {
  drawerOpened: false,
  filterOpened: false,
  departureCity: "",
  countriesList: [],
  arrivalCity: "",
  data: [],
  upd: false,
  loading: true,
  modalVisibility: false,
  nights: 3,
  month: 0
};

function Home({
  departureCity,
  arrivalCity,
  countriesList,
  onSetDepartureCity,
  onSetArrivalCity,
  onSetNightsQuantity,
  onToggleFilters,
  onSetMonth,
  data,
  nights,
  month,
  loading,
  handleCloseModal,
  modalVisibility,
  handleOpenModal,
  onApplyFilters,
  filterOpened
}) {
  return (
    <div className="root">
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar className="pallete">
            <Typography
              variant="title"
              color="inherit"
              className="drawer-toolbar"
            >
              Tour Radar
            </Typography>
            <IconButton
              className="ask"
              color="inherit"
              onClick={handleOpenModal}
            >
              <HelpIcon className="infoButtonMenu" />
            </IconButton>
          </Toolbar>
          <ExpansionPanel
            expanded={filterOpened}
            onChange={(event, expanded) => onToggleFilters(expanded)}
            className="filters"
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <FilterList className="filterIcon" />
              <Typography variant="subheading">Фильтры</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="flex-center">
              <div className="filter-list">
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
                    <MenuItem value={"Везде"}>Везде</MenuItem>
                    <MenuItem value={"Москва"}>Москва</MenuItem>
                    <MenuItem value={"Санкт-Петербург"}>
                      Санкт-Петербург
                    </MenuItem>
                    <MenuItem value={"Казань"}>Казань</MenuItem>
                  </Select>
                </div>
                <div className="filter-item">
                  <InputLabel htmlFor="arrival" className="input-label">
                    Куда
                  </InputLabel>
                  <Select
                    value={arrivalCity}
                    onChange={event => onSetArrivalCity(event.target.value)}
                    autoWidth={true}
                    className="select-item"
                    inputProps={{
                      name: "departure",
                      id: "departure"
                    }}
                  >
                    <MenuItem value={"Везде"}>{"Везде"}</MenuItem>
                    {countriesList.map(item => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="nights-item">
                  <InputLabel htmlFor="nights" className="input-label">
                    Ночей
                  </InputLabel>
                  <Select
                    value={nights}
                    onChange={event => {
                      onSetNightsQuantity(event.target.value);
                    }}
                    autoWidth={true}
                    className="select-item"
                    inputProps={{
                      name: "nights",
                      id: "nights"
                    }}
                  >
                    <MenuItem value={4}>Не важно</MenuItem>
                    <MenuItem value={1}>До 5</MenuItem>
                    <MenuItem value={2}>6-11</MenuItem>
                    <MenuItem value={3}>Больше 11</MenuItem>
                  </Select>
                </div>
                <div className="month-item">
                  <InputLabel htmlFor="month" className="input-label">
                    Месяц
                  </InputLabel>
                  <Select
                    value={month}
                    onChange={event => onSetMonth(event.target.value)}
                    autoWidth={true}
                    className="select-item"
                    inputProps={{
                      name: "month",
                      id: "month"
                    }}
                  >
                    <MenuItem value={13}>Любой</MenuItem>
                    {checkMonth(1) ? (
                      <MenuItem value={1}>Январь</MenuItem>
                    ) : null}
                    {checkMonth(2) ? (
                      <MenuItem value={2}>Февраль</MenuItem>
                    ) : null}
                    {checkMonth(3) ? <MenuItem value={3}>Март</MenuItem> : null}
                    {checkMonth(4) ? (
                      <MenuItem value={4}>Апрель</MenuItem>
                    ) : null}
                    {checkMonth(5) ? <MenuItem value={5}>Май</MenuItem> : null}
                    {checkMonth(6) ? <MenuItem value={6}>Июнь</MenuItem> : null}
                    {checkMonth(7) ? <MenuItem value={7}>Июль</MenuItem> : null}
                    {checkMonth(8) ? (
                      <MenuItem value={8}>Август</MenuItem>
                    ) : null}
                    {checkMonth(9) ? (
                      <MenuItem value={9}>Сентябрь</MenuItem>
                    ) : null}
                    {checkMonth(10) ? (
                      <MenuItem value={10}>Октябрь</MenuItem>
                    ) : null}
                    {checkMonth(11) ? (
                      <MenuItem value={11}>Ноябрь</MenuItem>
                    ) : null}
                    {checkMonth(12) ? (
                      <MenuItem value={12}>Декабрь</MenuItem>
                    ) : null}
                  </Select>
                </div>
                <div className="apply-filters-button">
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={() => {
                      onApplyFilters({
                        arrivalCity,
                        departureCity,
                        month,
                        nights
                      });
                    }}
                  >
                    Применить
                  </Button>
                </div>
                <div className="reset-button">
                  <Button
                    variant="raised"
                    color="primary"
                    className="cancel"
                    onClick={() => {
                      onSetArrivalCity("Везде");
                      onSetDepartureCity("Везде");
                      onSetMonth(13);
                      onSetNightsQuantity(4);
                    }}
                  >
                    Сбросить
                  </Button>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </AppBar>
        <div className="flex">
          {loading ? (
            <div className="loading">
              <CircularProgress size={100} />
            </div>
          ) : (
            <div>
              {data.length > 0 ? (
                <CardList data={data} />
              ) : (
                <div>
                  <div className="emptyData">
                    <img src={Empty} height={280} width={280} alt="" />
                  </div>
                  <InputLabel htmlFor="departure" className="input-label">
                    Упс. Измените город отправления или сбросьте фильтры.
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
            </div>
          )}
        </div>
        <div className="flex-modal">
          <Dialog
            open={modalVisibility}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Что это такое?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Это монитор дешевых туров, он показывает самые выгодные
                предложения от туроператоров. Слева в меню расположены фильтры:
                выбирайте город вылета и страны для отдыха и получайте самые
                дешевые варианты. Через 5 минут картина может измениться; вы
                увидите это сами. Без звонков турагенту, без поиска по сайтам,
                без суеты.
                <br />
                <br />Обратная связь:
                <a
                  href="mailto:helpme@turradar.ru?subject=TourRadar Web"
                  className="link"
                >
                  {" "}
                  helpme@turradar.ru
                </a>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary" autoFocus>
                Понятно
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default compose(
  lifecycle({
    componentDidMount() {}
  }),
  pure
)(Home);

function checkMonth(monthObject) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  if (day === daysInMonth(month, year)) {
    switch (month) {
      case 10:
        return monthObject === 1 || monthObject === 11 || monthObject === 12;
      case 11:
        return monthObject === 1 || monthObject === 2 || monthObject === 12;
      case 12:
        return monthObject === 1 || monthObject === 2 || monthObject === 3;
      default:
        break;
    }
    return (
      monthObject === month + 1 ||
      monthObject === month + 2 ||
      monthObject === month + 3
    );
  } else {
    switch (month) {
      case 11:
        return monthObject === 11 || monthObject === 12 || monthObject === 1;
      case 12:
        return monthObject === 12 || monthObject === 1 || monthObject === 2;
      default:
        break;
    }
    return (
      monthObject === month ||
      monthObject === month + 1 ||
      monthObject === month + 2
    );
  }
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
