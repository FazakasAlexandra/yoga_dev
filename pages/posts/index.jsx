import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import db from '../../db.js'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const getPosts = async () => {
    const res = await db.posts.getAll();
    const posts = await res.json();

    return posts.data;
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            posts: await getPosts(),
            ...(await serverSideTranslations(locale, ['blog', 'common']))
        },
        notFound: false,
        revalidate: 10
    }
}

export default function Posts({ posts }) {
    const router = useRouter()
    const { t } = useTranslation();

    const navigateToPost = (id) => {
        router.push({ pathname: `/posts/${id}` })
    }

    return (
        <Layout activeTab={'blog'}>
            {
                posts && <>
                    <div className="post-top" onClick={() => navigateToPost(posts[posts.length - 2]?.id)}>
                        <img src={posts[posts.length - 2]?.feature_image} />
                        <h1>{posts[posts.length - 2]?.title}</h1>
                        <h2>{posts[posts.length - 2]?.description}</h2>
                    </div>
                    <hr />
                    <h1 className="posts-thumb-heading">{t("blog:all articles")}</h1>
                    <div className="posts-thumb-container">
                        {
                            posts.map((post) => {
                                return <div className="post-thumb" onClick={() => navigateToPost(post.id)}>
                                    <img src={post.feature_image || "/assets/fallback_image_large.jpg"} />
                                    <h1>{post.title || t("blog:No title")}</h1>
                                </div>
                            })
                        }
                    </div>
                </>
            }
        </Layout>
    )
}