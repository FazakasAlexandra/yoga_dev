import Layout from '../../components/Layout';
import db from '../../db.js';
import { capitalize } from '../../utilities'
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'

export async function getStaticProps({ params, locale }) {
    const { category } = params
    let res;

    if (category !== "all") {
        res = await db.posts.getByCategory(category);
    } else {
        res = await db.posts.getAll();
    }

    const posts = await res.json()
    const date = new Date(Date.now())

    const categoriesRes = await db.posts.getCategories();
    const categories = await categoriesRes.json()

    return {
        props: {
            categories: [...categories.data, { id: 0, name: "all" }],
            category: category,
            posts: posts.data,
            updateDate: String(date),
            ...(await serverSideTranslations(locale, ['blog', 'common', 'categories']))
        },
        revalidate: 500
    }
}

export async function getStaticPaths({ locales }) {
    const res = await db.posts.getCategories();
    const categories = await res.json();

    let paths = []

    categories.data.forEach((category) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    category: category.name,
                },
                locale,
            });
        }
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export default function Posts({ categories, category, posts, updateDate }) {
    const router = useRouter();
    const { t } = useTranslation();
    const categoryTranslation = { category: t(`categories:${category}`) }

    const navigateToPost = (id) => router.push({ pathname: `/posts/${id}` })

    return (
        <Layout activeTab={'blog'}>
            {
                posts.length &&
                <div className="post-top" onClick={() => navigateToPost(posts[0].id)}>
                    <img src={posts[0].feature_image} />
                    <h1>{posts[0].title}</h1>
                    <h2>{posts[0].description}</h2>
                </div> || <p class="posts-not-found">
                    {t("blog:posts not found", categoryTranslation)}
                </p>
            }
            <hr />
            <h1 className="posts-thumb-heading">
                {capitalize(t("blog:selected_category", categoryTranslation))}
            </h1>
            <div className="categories-container">
                {
                    categories.map(({ name }) => {
                        return <Link href={`/blog/${name}`}>
                            <a className={name.toLowerCase() === category.toLowerCase() && "active" || null}>
                                {capitalize(t(`categories:${name}`))}
                            </a>
                        </Link>
                    })
                }
            </div>
            <div className="posts-thumb-container">
                {
                    posts.map((post) => {
                        return <div className="post-thumb" onClick={() => navigateToPost(post.id)} key={post.id}>
                            <img src={post.feature_image || "/assets/fallback_image_large.jpg"} />
                            <h1>{post.title || t("blog:No title")}</h1>
                        </div>
                    })
                }
            </div>
        </Layout>
    )
}