import { useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import Image from "next/image";
import { fetchInventory } from "@/utils/inventoryProvider";
import { slugify } from "@/utils/helpers";
import { SiteContext, ContextProviderComponent } from "@/context/mainContext";
import QuantityPicker from "@/components/QuantityPicker";

export default function ItemView(props) {
    const [numberOfitems, updateNumberOfItems] = useState(1)
    const {product} = props
    const {price, image, name, description} = product
    // const { context: {addToCart}} = props


    function addItemToCart (product) {
        product["quantity"] = numberOfitems
        addToCart
    }

    function increment(){
        updateNumberOfItems(numberOfitems + 1)
    }

    function decrement(){
        if (numberOfitems === 1) return
        updateNumberOfItems(numberOfitems - 1)
    }

    return (
        <>
        <Head>
        <title>Jamstack ECommerce - {name}</title>
        </Head>
        <div className="
        sm:py-10 px-10
        
        md:flex-row
        py-5 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className="w-full md:w-1/2 h-120  flex flex-1 bg-light hover:bg-light-200">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={image} alt="Inventory item" className="max-h-full" width={500}
        height={500} />
          </div>
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>
          <h2 className="text-2xl tracking-wide sm:py-8 py-6">Rp. {price}</h2>
          <p className="text-gray-600 leading-7">{description}</p>
          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
            />
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(product)}
          />
        </div>
      </div>
        
        </>
    )

    
}

export async function getStaticPaths () {
    const inventory = await fetchInventory()
    const paths = inventory.map(item => {
        return { params: {name: slugify(item.name)}}
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({params}){
    const name = params.name.replace(/-/g, " ")
    const inventory = await fetchInventory()
    const product = inventory.find(item => slugify(item.name) === slugify(name))

    return {
        props:{
            product,
        }
    }
}


function ItemViewWithContext(props) {
    return (
        <ContextProviderComponent>
            <SiteContext.Consumer>
                {
                    context => <ItemView {...props} context={context}/>
                }
            </SiteContext.Consumer>
        </ContextProviderComponent>
    )
}
