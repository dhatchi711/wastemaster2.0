import React from 'react';
import { Link } from 'react-router-dom';


import '../Recyclers/RecycleItem.css'
import Avatar from '../UIElements/Avatar';
import Card from '../UIElements/Card';

const RecyclingItem = props => {
    return (
        <li className="recycle-item">
            <Card className="recycle-item__content">
                <Link to={`/${props.id}/items`}>
                <div className="recycle-item__image">
                    <Avatar image={props.image} alt={props.name} />
                </div>
                <div className="recycle-item__info">
                    <h2>{props.name}</h2>
                    <h3>
                        {props.recycleCount} {props.recycleCount === 1 ? 'Recycled Item' : 'Recycled Items'}
                    </h3>
                </div>
                </Link>
            </Card>
        </li>
    );
};

export default RecyclingItem;