import React, {useEffect, useState} from 'react'
import RecyclingList from './RecyclingList'
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { useHttpClient } from '../hooks/http-hook';

const Recyclers = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/users'
          );
  
          setLoadedUsers(responseData.users);
        } catch (err) {}
      };
      fetchUsers();
    }, [sendRequest]);
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
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