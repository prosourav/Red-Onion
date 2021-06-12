import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddAbout = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { register, handleSubmit } = useForm();


    const handleImageUpload = event => {
        // console.log(event.target.files);
        const imageData = new FormData();
        imageData.set('key','8fa96cff7d7a3e5dd21028613fff8de4');
        imageData.append('image', event.target.files[0]);
        
        axios.post("https://api.imgbb.com/1/upload", imageData )
          .then(response => {
            //  console.log("success",response);
            setImageUrl(response.data.data.url);
          })
          .catch(error => {
            console.log("error",error);
          });
        }
    const onSubmit = data => {
        const About={
         Photo:imageUrl,
         heading:data.Heading,
         description:data.Description,
       }
      //  console.log('my new dish: ',About);
       const url = 'https://polar-basin-19195.herokuapp.com/addAbout'
       fetch(url,
         {method:'POST',
         headers:{'content-type' : 'application/json'},
         body:JSON.stringify(About)
       })
       .then(res=> console.log('server side response: ',res)             
       );
       }


    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input className='input' type='file' onChange={handleImageUpload}/>
        <input placeholder='Heading' {...register("Heading", { required: true, maxLength: 40 })} />
        <input placeholder='Description' {...register("Description", { required: true})} />
        <input type="submit" />
      </form>
        </div>
    );
};

export default AddAbout;