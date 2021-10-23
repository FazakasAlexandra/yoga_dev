import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import db from '../../db'
import {
  Preview,
} from '../../components/blog/'
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Page({ post }) {
  return (
    <Layout activeTab={'post'}>
      {post && <>
        <NextSeo
          openGraph={{
            type: 'website',
            url: `https://${process.env.NEXT_PUBLIC_DOMAIN}/posts/${post.id}` ,
            title: post.title || "Articol",
            description: post.description || "Sfaturi de la Fabiola pentru un stil de viata mai sanatos.",
            images: [
              {
                url: post.feature_image || "/assets/fallback_image.png",
                width: 800,
                height: 600,
                alt: post.title,
              }
            ],
          }}
        />
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


export async function getStaticProps({ params, locale }) {
  const res = await db.posts.getSingle(params.id);
  const post = await res.json()

  return {
    props: {
      post: post.data[0],
      ...(await serverSideTranslations(locale, ['blog', 'common']))
    },
    revalidate: 10
  }
}

export async function getStaticPaths({ locales }) {
  const res = await db.posts.getAll();
  const posts = await res.json();

  let paths = []

  posts.data.forEach((post) => {
    for (const locale of locales) {
      paths.push({
        params: { id: post.id },
        locale,
      });
    }
  });

  return {
    paths,
    fallback: 'blocking'
  }
}