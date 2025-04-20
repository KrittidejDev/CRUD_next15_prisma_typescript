import { prisma } from "@/lib/db";

const PostsDetail = async ({ params }: { params: { slug: string } }) => {
  const slugParams = await decodeURIComponent(params.slug);

  const post = await prisma.post.findUnique({
    where: {
      slug: slugParams,
    },
  });

  return (
    <div className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <div className="text-3xl font-semibold">{post?.title}</div>
      <div className="">{post?.content}</div>
      <img
        src={post?.imageUrl}
        alt="Preview"
        className="rounded-xl border max-w-[300px] max-h-[200px] object-cover"
      />
    </div>
  );
};

export default PostsDetail;
