import { compose, pure } from "recompose";
import moment from "moment";
import { connect } from "react-redux";
import {
  setMonth,
  setDeparureCity,
  setArrivalCity,
  setNightsQuantity,
  closeNot,
  handleCloseModal,
  handleOpenModal,
  applyFilters,
  toggleFilters
} from "./ducks";
import { bindActionCreators } from "redux";
import Home from "../components/home/index";

const mapStateToProps = state => ({
  drawerOpened: state.travelApp.get("drawerOpened"),
  departureCity: state.travelApp.get("departureCity"),
  arrivalCity: state.travelApp.get("arrivalCity"),
  upd: state.travelApp.get("not"),
  nights: state.travelApp.get("nights"),
  loading: state.travelApp.get("loading"),
  month: state.travelApp.get("month"),
  data: filterDate(sortItems(state.travelApp.get("filteredData"))),
  countriesList: Array.from(state.travelApp.get("countriesList")),
  modalVisibility: state.travelApp.get("modalVisibility"),
  filterOpened: state.travelApp.get("filterOpened")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSetDepartureCity: setDeparureCity,
      onSetArrivalCity: setArrivalCity,
      onSetNightsQuantity: setNightsQuantity,
      onCloseNot: closeNot,
      handleCloseModal: handleCloseModal,
      handleOpenModal: handleOpenModal,
      onSetMonth: setMonth,
      onApplyFilters: applyFilters,
      onToggleFilters: toggleFilters
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  Home
);


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
