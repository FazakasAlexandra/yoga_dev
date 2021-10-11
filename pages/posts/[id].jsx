import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'

export default function Page({description, feature_image, title}) {
  const router = useRouter()
  const [post, setPost] = useState(null)

  useEffect(() => {
    db.posts.getSingle(router.query.id).then(res => res.json()).then(res => {
      console.log(res.data[0])
      setPost(res.data[0])
    })

  }, [router.isReady])

  return (
    <Layout activeTab={'post'}>
      {post && <>
        <Head>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={feature_image} />
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


export async function getStaticProps() {
  return {
    props: {
      id: "2",
      title: "Hello",
      feature_image: "https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_mickey_ddt-16970_4e99445d.jpeg?region=0,0,600,600&width=480",
      description: "Micky"
    }
  }
}