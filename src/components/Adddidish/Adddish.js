import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
const Adddish = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null);
    const { register, handleSubmit } = useForm();

    const handleImageUpload = event => {
        // console.log(event.target.files);
        const imageData = new FormData();
        imageData.set('key','8fa96cff7d7a3e5dd21028613fff8de4');
        imageData.append('image', event.target.files[0]);
        
        axios.post("https://api.imgbb.com/1/upload", imageData )
          .then(response => {
             console.log("success",response);
            setImageUrl(response.data.data.url);
          })
          .catch(error => {
            console.log("error",error);
          });
          const imageData2 = new FormData();
          imageData2.set('key','8fa96cff7d7a3e5dd21028613fff8de4');
          imageData2.append('image', event.target.files[1]);
          
          axios.post("https://api.imgbb.com/1/upload", imageData2 )
            .then(response => {
              console.log("success",response);
              setImageUrl2(response.data.data.url);
            })
            .catch(error => {
              console.log("error",error);
            });
          }
    
        const onSubmit = data => {
         const NewDish={
          firstPhoto:imageUrl,
          secondPhoto:imageUrl2,
          dishName:data.DishName,
          dishType:data.DishType,
          description:data.Description,
          price:data.Price,
        }
        console.log('my new dish: ',NewDish);
        const url = 'http://localhost:8000/adddish'
        fetch(url,
          {method:'POST',
          headers:{'content-type' : 'application/json'},
          body:JSON.stringify(NewDish)
        })
        .then(res=> console.log('server side response: ',res)             
        );
        
      }
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input className='input' type='file' multiple onChange={handleImageUpload}/>
        <input placeholder='Dish Name' {...register("DishName", { required: true, maxLength: 20 })} />
        <input placeholder='Dish Type' {...register("DishType", { required: true, maxLength: 20 })} />
        <input placeholder='Description' {...register("Description",{required:true})} />
        <input placeholder='Price' {...register("Price",{required:true})} />  
        <input type="submit" />
      </form>
        </div>
    );
};

export default Adddish;


