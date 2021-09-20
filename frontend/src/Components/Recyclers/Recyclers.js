import React from 'react'
import RecyclingList from './RecyclingList'

const Recyclers = () => {
    const RECYCLERS = [
        {
            id: 'u1',
            name: 'Deepak',
            image: 'https://www.gtlaw.com/-/media/images/team/p/person-philip-i/34485largepng.png',
            recycleCount: 3
        }
    ];
    return <RecyclingList items={RECYCLERS}/>;
};

export default Recyclers;