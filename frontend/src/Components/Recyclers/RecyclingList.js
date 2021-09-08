import React from 'react';
import '../Recyclers/RecyclingList.css'
import RecyclingItem from './RecycleItem';
import Card from '../UIElements/Card';

const RecyclingList = props => {
    if(props.items.length === 0){
        return(
            <div className='center'>
                <Card>
                <h2>No Recyclers Found.</h2>
                </Card>
            </div>
        );
    }

    return <ul className='recycling-list'>
        {props.items.map(user =>( 
            <RecyclingItem key={user.id} id={user.id} image={user.image} name={user.name} recycleCount={user.recycleCount}/>
        ))}
    </ul>
};

export default RecyclingList;