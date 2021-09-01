import React from 'react';
import '../Recyclers/RecyclingList.css'
import RecyclingItem from './RecycleItem';

const RecyclingList = props => {
    if(props.items.length === 0){
        return(
            <div className='center'>
                <h2>No Recyclers Found.</h2>
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