import Title from '@/components/common/title';
import NotFound from '@/components/not-found';
import { getAuth } from '@/lib/auth';
import BlogsModule from '@/modules/admin/blogs';
import useBlogs from '@/services/blogs';
import useBlogCategories from '@/services/blogs/categories';
import type { FC } from 'react';

interface BlogsPageProps { }

const BlogsPage: FC<BlogsPageProps> = async () => {
    const { token } = await getAuth()
    const { getAllBlogs } = useBlogs({ token })
    const { getAllBlogCategories } = useBlogCategories({ token })

    const [blogs, categories] = await Promise.all([getAllBlogs(), getAllBlogCategories()])

    if (!blogs || blogs.data.length === 0) {
        return (
            <NotFound
                title='No Blogs Found'
                description='It looks like there are no Blogs available at the moment. Please check back later or try refreshing the page.' />
        )
    }
    return (
        <>
            <Title text='Blogs' buttonText='Add Blog' url='/admin/blogs/add' />
            <BlogsModule blogs={blogs} categories={categories} />
        </>
    );
}

export default BlogsPage;
