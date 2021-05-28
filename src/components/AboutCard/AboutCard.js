import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './AboutCard.css';

const AboutCard = (props) => {
    const [descriptionCollapse,setDescriptionCollapse] = useState(false);
    const {Photo,heading,description,icon} = props.about;
    const showMore = () => {
        console.log("Show More");
        setDescriptionCollapse(true);
    }
    const showLess = () => {
        console.log("Show less");
        setDescriptionCollapse(false);
    }
    return (
      
            <div className='aboutCard'>
                <img src={Photo} alt="" />
                <div className='content'>
                <h4><span><img src={icon} alt="" style={{width:'35px', marginRight:'6px'}} /></span>{heading}</h4>
                <p>
                {
                    descriptionCollapse ? description : description.substr(0,100)
                }
                </p>
                {
                    descriptionCollapse? 
                    <span onClick={showLess} className="card-link collapse-btn">See Less <FontAwesomeIcon className="icon" icon={faArrowAltCircleLeft} /></span>
                    :
                    <span onClick={showMore} className="card-link collapse-btn">See More <FontAwesomeIcon className="icon" icon={faArrowAltCircleRight} /></span>
                }
                
                </div>
            </div>
        
    );
};

export default AboutCard;