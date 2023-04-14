import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <>
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
    <FloatingWhatsApp  phoneNumber="+6285156182941"
        accountName="Anone"/>
    </>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce