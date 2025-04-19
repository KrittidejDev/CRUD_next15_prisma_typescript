import { prisma } from "@/lib/db";

const PostsDetail = async ({ params }) => {
  const slugParams = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug: slugParams.slug,
    },
  });

  return (
    <div className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <div className="text-3xl font-semibold">{post?.title}</div>
      <div className="">{post?.content}</div>
    </div>
  );
};

export default PostsDetail;
