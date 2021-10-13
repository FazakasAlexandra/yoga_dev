import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import db from '../../db.js'
import { useRouter } from 'next/router'

export default function Posts() {
    const router = useRouter()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.posts.getAll().then(res => res.json()).then(res => {
            console.log(res.data)
            setPosts(res.data)
        })
    }, [])

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
                    <h1 className="posts-thumb-heading">All articles</h1>
                    <div className="posts-thumb-container">
                        {
                            posts.map((post) => {
                                return <div className="post-thumb" onClick={() => navigateToPost(post.id)}>
                                    <img src={post.feature_image} />
                                    <h1>{post.title}</h1>
                                </div>
                            })
                        }
                    </div>
                </>
            }
        </Layout>
    )
}