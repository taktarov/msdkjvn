import React from "react";
import { compose, pure } from "recompose";
import Card, { CardContent, CardMedia, CardActions } from "material-ui/Card";
import { Link } from "react-router-dom";
import FlightTakeoff from "material-ui-icons/FlightTakeoff";
import Tooltip from 'material-ui/Tooltip';
import QueryBuilder from "material-ui-icons/QueryBuilder";
import Typography from "material-ui/Typography";
import { string, number } from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import "./card.less";

tourCard.propTypes = {
  from: string,
  to: string,
  nights: string,
  link: string,
  price: number,
  provider: string,
  departure: string,
  imageUrl: string
};

tourCard.defaultProps = {
  from: "Город Вылета",
  to: "Страна Прилёта",
  nights: "14",
  link: "",
  price: 0,
  provider: "Поставщик услуг",
  departure: "Дата отправления",
  imageUrl:
    "http://www.caribpress.com/wp-content/uploads/2017/03/Travel-site.jpg"
};

function tourCard({
  from,
  to,
  nights,
  link,
  price,
  provider,
  departure,
  imageUrl
}) {
  moment.locale("ru");
  return (
    <div>
      <Card className="card">
        <Link to={link} className="link" target="_blank">
          <CardMedia
            className="media"
            image={imageUrl}

          />
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="headline"
            component="h3"
            class="where"
          >
            {changeName(from)} - {changeName(to)}
          </Typography>
          <div>
            <Tooltip id="tooltip-qb" title="Продолжительность тура" placement="top">
              <QueryBuilder />
            </Tooltip>
            <Typography component="p" class="description-date">
              {nights} {nights > 3 ? "ночей" : "ночи"}
            </Typography>
            <Tooltip id="tooltip-takeoff" title="Дата вылета" placement="top">
              <FlightTakeoff className="icon" />
            </Tooltip>
            <Typography component="p" class="description-date">
              {moment(departure, "DD-MM").format("Do MMMM")}
            </Typography>
          </div>
          <Typography component="p" class="description-agent">
            Стоимость c человека
          </Typography>
          <Typography component="p" class="price">
            {price + "₽"}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={link} className="link" target="_blank">
            <Typography component="p" class="description-agent-1">
              Выбрать тур
            </Typography>
          </Link>
          <Typography component="p" class="agent">
            найден {provider}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}

export default compose(pure)(tourCard);

function changeName(name) {
  if (name === "Санкт-Петербург") {
    return "Петербург";
  }
  return name;
}
