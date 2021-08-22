import React from 'react';

const About = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <h1>WasteMaster is created by two college juniors, Dhatchi Govindarajan and Siddish Sankaranarayanan.</h1>
      <h3>The way to use the application is as simple as it sounds. Upload a JPEG or PNG file of an image of an item that you don't know how to dispose, and the WasteMaster will provide you where to throw the item. It answers all your problems in improper waste management and helps you become more environmentally conscious!</h3>
    </div>
  );
};

export default About;