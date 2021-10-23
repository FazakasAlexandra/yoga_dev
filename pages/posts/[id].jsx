import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'
import { ArticleJsonLd } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Page({ post }) {
  return (
    <Layout activeTab={'post'}>
      {post && <>
        <Head>
          <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/posts/${post.id}`} />
          <meta property="og:title" content={post.title || "Articol"} />
          <meta property="og:description" content={post.description || "Sfaturi de la Fabiola pentru un stil de viata mai sanatos."} />
          <meta property="og:image" content={post.feature_image || "/assets/fallback_image.png"} />
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


export async function getServerSideProps({ params, locale }) {
  const res = await db.posts.getSingle(params.id);
  const post = await res.json()

  return {
    props: {
      post: post.data[0],
      ...(await serverSideTranslations(locale, ['blog', 'common']))
    }
  }
}