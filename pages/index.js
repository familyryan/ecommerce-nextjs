import Head from "next/head"
import { titleIfy, slugify } from "@/utils/helpers"
import inventory from "@/utils/inventory"
import Center from "@/components/heroComponents/Center"
import Tag from "@/components/heroComponents/Tag"
import Footer from "@/components/heroComponents/Footer"
import Showcase from "@/components/heroComponents/Showcase"
// import CartLinkWithContext from "@/components/cartLink"

export default function Home({categories: categoryData = []}) {

 
  const categories = categoryData.slice(0,2)
  return (
    <>
    {/* <CartLinkWithContext/> */}
    <div className="w-full">
      <Head>
        <title>
          Anone Ecommerce
        </title>
      </Head>
      <div className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag
              year="2021"
              category="SOFAS"
            />
            <Center
              price="200"
              title={inventory[2].name}
              link={`/product/${slugify(inventory[2].name)}`}
            />
            <Footer
              designer="Jason Bourne"
            />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
              <Showcase
                imageSrc={inventory[2].image}
              />
              <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
    
    </>
  )
}


export async function getStaticProps() {
  const inventoryCategorized = inventory.reduce((acc, next)=>{
    const categories = next.categories
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      }else{
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        }
        acc.push(item)
      }

    })
    return acc
  }, [])
  return {
    props: {
      inventoryData: inventory,
      categories: inventoryCategorized
    }
  }
}