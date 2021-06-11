import React, { useEffect, useState } from 'react';
import AboutCard from '../AboutCard/AboutCard';
import './About.css';
const About = () => {
    const [about,setAbout] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8000/about')
        .then(res=>res.json())
        .then(data=>setAbout(data))
    },[]);
    // console.log('about: ',about);
    return (
        <div className='container'>
        <div className='sec-one'>
        <h1>Why To Choose Us</h1>
            <p className='about-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, culpa recusandae consectetur exercitationem autem perspiciatis amet unde accusamus possimus vitae rerum laborum  sit amet consectetur adipisicing elit. Doloribus,  nostrum 
            ipsum!
            </p>
            </div>
            <div className='sec-two d-flex '>
                {
                    about.map(about=><AboutCard key={about._id} about={about}></AboutCard>)
                }
            </div>
        </div>
    );
};

export default About;