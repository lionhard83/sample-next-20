import Head from 'next/head';


interface ProductData {
    title: string;
    description: string;
    price: number;
    id: number;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
  }

  interface ProductProps {
    productData: ProductData;
  }

export const Product = ({productData}: ProductProps) => {
    return <div>
    <Head>
      <title>{productData.title}</title>
      <meta name="description" content={productData.description} />
      <meta property="og:title" content={productData.title}/>
      <meta property="og:description" content={productData.description}/>
      <meta property="og:image" content={productData.image}/>
      <meta property="og:type" content={productData.category}/>

    </Head>
    <h1>Post ID: {productData.id}</h1>
    <p>Title: {productData.title}</p>
    <p>Description: {productData.description}</p>
    <img src={productData.image}></img>
  </div>
}

export async function getServerSideProps(context: any) {
    const { params } = context;
    const { id } = params;
  
    // Effettua una chiamata API per ottenere i dati in base all'ID
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const productData: ProductData = await response.json();
    // Ritorna i dati come props
    return {
      props: {
        productData,
      },
    };
  }

  export default Product;
  