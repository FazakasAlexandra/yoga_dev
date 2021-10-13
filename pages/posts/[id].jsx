import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'
import { ArticleJsonLd } from 'next-seo';

export default function Page({ post }) {

  return (
    <Layout activeTab={'post'}>
      {post && <>
        <Head>
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={post.feature_image} />
        </Head>
        <ArticleJsonLd
          url={`https://${process.env.NEXT_PUBLIC_DOMAIN}/posts/${post.id}`}
          title={post.title}
          images={[
            post.feature_image,
          ]}
          datePublished={post.created_at || "2021-02-05T08:00:00+08:00"}
          dateModified={post.updated_at || "2021-02-05T09:00:00+08:00"}
          authorName={['Muresan Fabiola']}
          publisherName="Muresan Fabiola"
          publisherLogo={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/logo.png`}
          description={post.description}
        />
        <div className="post">
          <Preview
            id={post.id}
            title={post.title}
            featureImage={post.feature_image}
            description={post.description}
            nodes={JSON.parse(post.content)}
            isPreview={true}
          />
        </div>
      </>
      }
    </Layout>
  )
}


export async function getStaticProps({ params }) {
  const res = await db.posts.getSingle(params.id);
  const post = await res.json()

  return {
    props: { post: post.data[0] }
  }
}

export async function getStaticPaths() {
  const res = await db.posts.getAll();
  const posts = await res.json();

  const paths = posts.data.map((post) => {
    return {
      params: {
        id: post.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}