"use client";

import { createPost } from "@/action/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import InputUpload from "../Inputs/InputUpload";

const schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string(),
  file: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

const AddPostForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await createPost(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 w-[300px]"
    >
      <Controller
        name="file"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <InputUpload value={field.value} onChange={field.onChange} />
        )}
      />

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
        control={control}
        defaultValue=""
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
