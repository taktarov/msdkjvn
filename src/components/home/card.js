import React from "react";
import { compose, pure } from "recompose";
import Card, { CardContent, CardMedia, CardActions } from "material-ui/Card";
import { Link } from "react-router-dom";
import FlightTakeoff from "material-ui-icons/FlightTakeoff";
import QueryBuilder from "material-ui-icons/QueryBuilder";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
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
  imageUrl: ""
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
        <CardMedia className="media" image={imageUrl} title="" />
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
            <QueryBuilder />
            <Typography component="p" class="description-date">
              {nights} {nights > 3 ? "ночей" : "ночи"}
            </Typography>
            <FlightTakeoff className="icon" />
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
            {provider}
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
