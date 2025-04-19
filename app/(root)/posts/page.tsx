import AddPostForm from "@/components/forms/AddPostForm";
import { prisma } from "@/lib/db";
import Link from "next/link";

const PostsPage = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "test@mail.com",
    },
    include: {
      posts: true,
    },
  });

  // const posts = await prisma.post.findMany({
  //   where: {
  //     published: false,
  //     title: {
  //       startsWith: "test",
  //     },
  //   },
  //   orderBy: {
  //     createAt: "desc",
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     slug: true,
  //   },
  //   // take: 1,
  //   // skip: 1,
  // });
  // const postCount = await prisma.post.count();

  return (
    <div className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">
        All Posts ({user?.posts.length})
      </h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <AddPostForm />
    </div>
  );
};

export default PostsPage;
