import "./Home.css"
import Navbar from "./../../components/Navbar/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "./../../components/ProductCard/ProductCard"

const Home = ()=>{
    const [products , setProducts] = useState([]);

    const loadProducts = async () => {
        try{
            const response = await axios.get("/products")
            setProducts(response?.data?.data);
        }
        catch(err){
            console.log(err);
            alert("Error Loading products")
        }
    }

    useEffect(()=>{
        loadProducts()
    },[])

    return(
        <>
        <Navbar />
        <div className="product-container">
        {
            products?.map((product , index)=>{

                const { _id ,name , description, price , image , category  } = product
                return(<ProductCard key={index}
                     name = {name}
                     description={description}
                     price={price}
                     image={image}
                     category={category}
                     id={_id}
                     />)
            })
        }
        </div>
        </>
    )
}

export default Home