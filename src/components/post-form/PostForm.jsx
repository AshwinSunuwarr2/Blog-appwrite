import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updatePost } from "../../store/postSlice";

export default function PostForm({post}) {
  console.log("~~~~~~~", post)
  const [loader, setLoader] =  useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const submit = async (data) => {
    setLoader(true);
    if (post) {
      
      const file = data.image[0]
        ? await appwriteService.UploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.DeleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.UpdatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        dispatch(updatePost(dbPost));
        // navigate('/post/'+dbPost.$id)
        navigate(`/post/${dbPost.$id}`);
        setLoader(false);
      }
    } else {
      const file = await appwriteService.UploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.CreatePost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          dispatch(addPost(dbPost));
          // navigate('/post/'+dbPost.$id)
          navigate(`/post/${dbPost.$id}`);
          setLoader(false);
          
        }
      }

    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            {console.log("post.featuredImage ===", post.featuredImage)}
            <img
              src={appwriteService.GetFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {loader ? "Loading..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
