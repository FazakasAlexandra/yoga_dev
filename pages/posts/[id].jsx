import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'

export default function Page({post}) {
  const router = useRouter()

  console.log("HEYA", post)

  return (
    <Layout activeTab={'post'}>
      {post && <>
        <Head>
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={post.feature_image} />
        </Head>
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

export async function getStaticPaths(){
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