import { compose, pure } from "recompose";
import moment from "moment";
import { connect } from "react-redux";
import {
  openDrawer,
  closeDrawer,
  setDeparureCity,
  setArrivalCity,
  closeNot,
  handleCloseModal,
  handleOpenModal
} from "./ducks";
import { bindActionCreators } from "redux";
import Home from "../components/home/index";

const mapStateToProps = state => ({
  drawerOpened: state.travelApp.get("drawerOpened"),
  departureCity: state.travelApp.get("departureCity"),
  arrivalCity: Array.from(state.travelApp.get("arrivalCity")),
  upd: state.travelApp.get("not"),
  loading: state.travelApp.get("loading"),
  data: filterDate(
    sortItems(
      filterData(
        state.travelApp.get("data"),
        state.travelApp.get("departureCity"),
        state.travelApp.get("arrivalCity")
      )
    )
  ),
  countriesList: Array.from(state.travelApp.get("countriesList")),
  modalVisibility: state.travelApp.get("modalVisibility")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onOpenDrawer: openDrawer,
      onCloseDrawer: closeDrawer,
      onSetDepartureCity: setDeparureCity,
      onSetArrivalCity: setArrivalCity,
      onCloseNot: closeNot,
      handleCloseModal: handleCloseModal,
      handleOpenModal: handleOpenModal
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  Home
);

function filterData(data, departureCity, arrivalCity) {
  const ArrivalCity = Array.from(arrivalCity);
  if (output(data).length > 6) {
    if (ArrivalCity[0] === "Везде") {
      if (departureCity === "Везде") {
        return output(data);
      }
      const someData = output(data).filter(item => item.from === departureCity);
      return someData;
    }
    if (departureCity !== "" && departureCity !== "Везде") {
      const outputData = output(data).filter(
        item => item.from === departureCity
      );
      if (ArrivalCity.length > 0) {
        return outputData.filter(item => ArrivalCity.indexOf(item.to) !== -1);
      }
      return outputData;
    }
    if (ArrivalCity.length > 0) {
      return output(data).filter(item => ArrivalCity.indexOf(item.to) !== -1);
    }
  }
  return output(data);
}

const output = data =>
  Object.keys(data).map(function(key) {
    return data[key];
  });

function comparePrice(item1, item2) {
  return item1.price > item2.price ? 1 : -1;
}

function sortItems(data) {
  const newData = data.slice().sort(comparePrice);
  return newData;
}

function filterDate(data) {
  if (data.length > 6) {
    return data.filter(item => {
      const time = item.lastupdatedate + " " + item.lastupdatetime;

      return !moment(time, "DD-MM-YYYY + HH:mm")
        .add(1, "days")
        .isBefore(moment());
    });
  }
  return data;
}
