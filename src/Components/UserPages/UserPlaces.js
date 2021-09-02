import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../RecycledItems/RecycleItemList';
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Compost from Yesterday',
      description: 'One of my biggest compost piles!',
      imageUrl: 'https://binfresco.com/wp-content/uploads/2019/04/Trash-Can-Compost-Bin-1024x683-1024x675.jpg',
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Glass Recycling',
      description: 'Glass bottles from the party!',
      imageUrl: 'https://previews.123rf.com/images/josepijosep/josepijosep2003/josepijosep200300369/142655505-lots-of-glass-bottle-trash.jpg',
      creator: 'u1'
    },
    {
      id: 'p3',
      title: 'Metal Recycling!',
      description: 'Loads of metal!',
      imageUrl: 'https://previews.123rf.com/images/juliannedev/juliannedev1803/juliannedev180300265/98550612-metal-trash-for-scrap.jpg',
      creator: 'u1'
    }
  ];
  
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place=>place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;