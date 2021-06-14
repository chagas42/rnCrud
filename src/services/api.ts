import axios from 'axios'; 
import { getData } from '../auth/storage';

const api = axios.create({
    baseURL: "https://processo.profranchising.com.br/"
}); 



export async function getList(page:number, size:number){
    
    const token = await getData('token');


    const response = await api.get(`/product/list?page=${page}&size=${size}`, {
        headers: {
            authorization:token
        }
    }); 

    return response.data.content; 

}; 

export async function removeItem(id:number){
    
    const token = await getData('token'); 

    const response = await api.delete(`/product/delete/${id}`, {
        headers: {
            authorization:token
        }
    }); 

}; 

export async function newItem(name:string, price:number){

    const token = await getData('token'); 

    const data = {
        "image": "string",
        "ingredients": [
          {
            "cost": 5,
            "id": 0,
            "name": "Sal",
            "quantity": 100
          }, 
          {
            "cost": 10,
            "id": 0,
            "name": "Açucar",
            "quantity": 200
          }
        ],
        "name": name,
        "price": price
      }

    const response = await api.post('/product/save', data, {
        headers:{
            authorization:token 
        }
    })

    return response; 

}

export async function editItem(price:number, id:number, name:string){
    
    const token = await getData('token'); 


    const data = {
        "id": id,
        "name": name,
        "image": "string",
        "price": price,
        "ingredients": [
          {
            "id": 1061,
            "name": "Royal",
            "quantity": 100.0,
            "cost": 5.00
          }
        ]
      }

      console.log(token)


      const response = await api.post('/product/save', data, {
        headers:{
            authorization:token 
        }
    })


    return response; 

}

export default api; 