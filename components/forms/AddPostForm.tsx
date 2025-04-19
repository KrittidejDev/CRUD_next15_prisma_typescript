import { createPost } from "@/action/action";

const AddPostForm = () => {
  return (
    <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
      <input
        name="title"
        placeholder="Title"
        className="px-4 py-2 rounded-xl border-black/10 border"
      />
      <textarea
        name="content"
        rows={5}
        placeholder="Content"
        className="px-4 py-2 rounded-xl border-black/10 border "
      />
      <button type="submit" className="bg-blue-500 py-2 text-white rounded-xl">
        Create Post
      </button>
    </form>
  );
};

export default AddPostForm;
