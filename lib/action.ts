"use server"; 
import getCollection, { URL_COLLECTION } from "../db"; 

function isValid(url : string){
    try{
        new URL(url);
        return true;
    }catch{
        return false;
    }
}
type Result =
  | { error: string }
  | { success: true; shortened: string };

export default async function action({url, alias} : {url:string; alias:string}) : Promise<Result> {

    if(!isValid(url)){
        return { error : "URL is not valid."};
    }

    const collection = await getCollection(URL_COLLECTION); 
    const existing = await collection.findOne({ alias }); 

    if (existing){
        return { error : 'Alias is already taken, choose another one'}
    }
    await collection.insertOne( {alias, url}); 

    return { success : true, shortened : `${process.env.PUBLIC_URL}/${alias}`}
}