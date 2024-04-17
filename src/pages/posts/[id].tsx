
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PostData {
  title: string;
  body: string;
  id: number;
  userId: number
}

interface PostProps {
  postData: PostData;
}

export const Post = ({ postData }: PostProps) => {
    return  <div>
    <Head>
      <title>{postData.title}</title>
      <meta name="description" content={postData.title} />
    </Head>
    <h1>Post ID: {postData.id}</h1>
    <p>Title: {postData.title}</p>
    <p>Description: {postData.body}</p>
  </div>
}


export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id } = params;

  // Effettua una chiamata API per ottenere i dati in base all'ID
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const postData: PostData = await response.json();
    console.log(postData);
  // Ritorna i dati come props
  return {
    props: {
      postData,
    },
  };
}

export default Post;






// export default function Post({ postData }: PostProps) {
//   const router = useRouter();
//   const { id } = router.query;

//   // Se i dati non sono ancora stati caricati, visualizza un messaggio di caricamento
//   if (!postData) {
//     return <div>Loading...</div>;
//   }

//   // Visualizza i dati del post
//   return (
//     <div>
//       <h1>Post ID: {id}</h1>
//       <p>Title: {postData.title}</p>
//       <p>Body: {postData.body}</p>
//     </div>
//   );
// }

// // Funzione per caricare i dati lato server in base all'ID
