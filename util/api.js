import $axios from 'axios';
const hostUrl = "http://47.113.113.156:8080"; 
// const hostUrl = "http://localhost:8081"; 

const imgHostUrl = 'http://47.113.113.156:80'

export function addToMain(id){
    // console.log(`${hostUrl}/addToMain`)
       return $axios.get(`${hostUrl}/addToMain?id=`+id)
} 

export function rmFromMain(id){
    // console.log(`${hostUrl}/addToMain`)
       return $axios.get(`${hostUrl}/rmFromMain?id=`+id)
}


export function getAllAgent(){
    console.log(`${hostUrl}/addHome`)
       return $axios.get(`${hostUrl}/getAllAgent`)
}

export function addAgent(data){
    console.log(`${hostUrl}/addHome`)
    return $axios.post(`${hostUrl}/addAgent`,{
         ...data
    })
}

export function delAgent(id){
    return $axios.get(`${hostUrl}/delAgent?id=${id}`);
}


export function addHome(form){
     console.log(`${hostUrl}/addHome`)
        return $axios.post(`${hostUrl}/addHome`,{
            ...form
        })
}







export function getAllUser(){
    // console.log(`${hostUrl}/getAllUser`)
       return $axios.get(`${hostUrl}/getAllUser`)

}

export function getAllHome(){
       return $axios.get(`${hostUrl}/getAllHome`)
}

export function delHome(id){
    
    return $axios.get(`${hostUrl}/delHome?id=${id}`);

}

export function addHouseType(form){
    return $axios.post(`${hostUrl}/addHouseType`,{
         ...form
    });
}