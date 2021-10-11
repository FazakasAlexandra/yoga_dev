import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'

export default function Page() {
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
        <meta property="og:title" content={post.feature_image} />
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
