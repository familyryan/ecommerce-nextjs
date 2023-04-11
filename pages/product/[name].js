import { use, useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import Image from "next/image";
import { fetchInventory } from "@/utils/inventoryProvider";
import { slugify } from "@/utils/helpers";
import { SiteContext, ContextProviderComponent } from "@/context/mainContext";

export default function ItemView(props) {
    const [numberOfItemsInCart, updateNumberOfItems] = useState(1)
    const {product} = props
    const {price, image, name, description} = product
    const { context: {addToCart}} = props

    
}

