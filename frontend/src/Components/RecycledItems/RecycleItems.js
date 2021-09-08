import React from 'react';
import Button from '../FormElements/Button';
import Card from '../UIElements/Card';
import './RecycleItems.css';

const PlaceItem = props => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse to={`/recycling/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;