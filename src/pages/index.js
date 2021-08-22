import React from 'react';
import Card from '../Components/Card/Card.js';
import '../index.css';
import Upload from '../Components/UploadImg/Upload.js'

const Home = () => {
  return (
    <div className = 'App'>
    <Upload></Upload>
    <div class='flexbox-container'>
    <div class='test'>
    <Card
    title = 'Compostables'
    imageUrl = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2019%2F04%2F12163220%2Fcompost-pile-rake-86cd59eb.jpg'
    body = 'Description'/></div>
    <div class='test'>
    <Card
    title = 'Recyclables'
    imageUrl = 'https://tryengineering.org/wp-content/uploads/Recycling.png'
    body = 'Description'/></div>
    <div class='test'>
    <Card
    title = 'Disposables'
    imageUrl = 'https://tryengineering.org/wp-content/uploads/Recycling.png'
    body = 'Description'/></div>
  </div>
  </div>
);
};

export default Home;
