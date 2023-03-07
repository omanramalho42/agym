import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },

        // Statically Generates /posts/a/b/c
        // id: ['a', 'b', 'c'],
    ],
    /**
      Se fallback for false, qualquer caminho não retornado por getStaticPaths resultará em uma página 404 .
      Quando next build for executado, o Next.js irá verificar se getStaticPathsretornou fallback: false, 
      ele irá construir apenas os caminhos retornados por getStaticPaths. Esta opção é útil se você tiver 
      um pequeno número de caminhos para criar ou novos dados de página não forem adicionados com frequência. 
      Se você achar que precisa adicionar mais caminhos e tiver fallback: false, precisará executar next build
      novamente para que os novos caminhos possam ser gerados.
     */
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = [{ slug: params.id }];
  
  return {
    props: {
      slug,
    },
    revalidate: 1
  }
  // Fetch necessary data for the blog post using params.id
}

const Post = ({ slug }) => {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const [post, setPost] = useState(
    slug[0]?.slug || []
  );
  
  useEffect(() => {
    if(slug) {
      const { slug: postSlug } = slug[0];
      setPost(postSlug);
    }

    return () => {
      console.log(post,'slug');
    }
  },[slug]);
  
  return (
    <div>
      <p>
        post { slug[0]?.slug }
      </p>
    </div>
  )
}

export default Post;