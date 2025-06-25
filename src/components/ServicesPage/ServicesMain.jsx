import React from 'react';
import "./ServicesMain.css"
import ServicesMainArticle from './ServicesMainArticle';
import { ServicesArticlesContent } from '../../constants';

const ServicesMain = () => {

  return (
    <main className='servicesMain'>
      <ServicesMainArticle {...ServicesArticlesContent.syllabus} />
      <ServicesMainArticle {...ServicesArticlesContent.qna} />
      <ServicesMainArticle {...ServicesArticlesContent.unit} />
      <ServicesMainArticle {...ServicesArticlesContent.insights} />
      <ServicesMainArticle {...ServicesArticlesContent.maps} />
      <ServicesMainArticle {...ServicesArticlesContent.customPreparation} />
      <ServicesMainArticle {...ServicesArticlesContent.aiFeatured} />
    </main>
  )
}

export default ServicesMain;
