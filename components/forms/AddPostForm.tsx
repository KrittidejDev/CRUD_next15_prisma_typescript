"use client";

import { createPost } from "@/action/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "title is required"),
  // title: z.string(),
  content: z.string(),
});

type FormData = {
  title: string;
  content: string;
};

const AddPostForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await createPost(data);
    await reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 w-[300px]"
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <input
              {...field}
              placeholder="Title"
              className="px-4 py-2 rounded-xl border-black/10 border"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </>
        )}
      />
      <Controller
        name="content"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              rows={5}
              placeholder="Content"
              className="px-4 py-2 rounded-xl border-black/10 border "
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </>
        )}
      />

      <button type="submit" className="bg-blue-500 py-2 text-white rounded-xl">
        Create Post
      </button>
    </form>
  );
};

export default AddPostForm;
