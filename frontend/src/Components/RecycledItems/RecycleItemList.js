import React from 'react';

import Card from '../UIElements/Card';
import RecycleItems from './RecycleItems';
import './RecycleItemList.css';
import Button from '../FormElements/Button';

const RecycleItemList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No items recycled. Maybe recycle me?</h2>
          <Button to='/recycling/new'>Classify my Trash!</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <RecycleItems
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          creatorId={place.creator}
        />
      ))}
    </ul>
  );
};

export default RecycleItemList;
