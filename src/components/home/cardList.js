import React from "react";
import { compose, pure } from "recompose";
import { object, arrayOf } from "prop-types";
import Card from "./card";
import "./cardList.less";

CardList.propTypes = {
  data: arrayOf(object)
};

CardList.defaultProps = {
  data: []
};

function CardList({ data }) {
  return (<div className="flex">
    {data.length > 0
      ? data.map((item, index) =>
        item ? (
          <Card
            from={item.from}
            to={item.to}
            nights={item.nights}
            link={item.link}
            price={item.price}
            provider={item.provider}
            departure={item.departure}
            imageUrl={item.imgurl}
            key={index}
          />
        ) : null
      )
      : null}
  </div>
  );
}

export default compose(pure)(CardList);
