import { deletePost } from "@/action/action";
import Buttons from "@/components/Buttons/Buttons";
import AddPostForm from "@/components/Forms/AddPostForm";
import IconsTrash from "@/components/Icons/IconsTrash";
import { prisma } from "@/lib/db";
import Image from "next/image";
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

  return (
    <div className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">
        All Posts ({user?.posts.length})
      </h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between p-2 gap-x-10 mb-2 border border-black/10 rounded-md"
          >
            <Image
              src={post?.imageUrl ?? "/fallback.png"}
              width={25}
              height={25}
              alt={post?.imageUrl ?? ""}
            />
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <Buttons
              label="X"
              frontIcon={<IconsTrash color="red" />}
              action={async () => {
                "use server";
                await deletePost(post.id);
              }}
            />
          </li>
        ))}
      </ul>

      <AddPostForm />
    </div>
  );
};

export default PostsPage;
