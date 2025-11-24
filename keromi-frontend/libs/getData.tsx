export default async function getData(){
    const response = await fetch(`http://10.80.88.141:5000/api/sensor`);
    console.log(response )

    if(!response.ok){
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}