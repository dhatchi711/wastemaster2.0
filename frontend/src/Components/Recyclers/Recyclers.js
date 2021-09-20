import React, {useEffect, useState} from 'react'
import RecyclingList from './RecyclingList'
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const Recyclers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();
  
    useEffect(() => {
      const sendRequest = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:5000/api/users');
  
          const responseData = await response.json();
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
  
          setLoadedUsers(responseData.users);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      };
      sendRequest();
    }, []);
  
    const errorHandler = () => {
      setError(null);
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUsers && <RecyclingList items={loadedUsers} />}
      </React.Fragment>
    );
  };
  
export default Recyclers;