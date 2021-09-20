import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../UIElements/Card';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../util/validators';
import { useForm } from '../hooks/form-hook';
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

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().recyclingId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if(identifiedPlace){
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
  
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
