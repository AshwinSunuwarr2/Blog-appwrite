import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm() {
    const navigate = useNavigate()
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active'
        }
    })

    const userData = useSelector((state) => state.user.userData)

    const submit = async (data) =>{
        if(post){
            const file = data.image[0] ? appwriteService.UploadFile(data.image[0]) : null
            if(file){
                appwriteService.DeleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.UpdatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if(dbPost){
                // navigate('/post/'+dbPost.$id)
                navigate(`/post/${dbPost.$id}`)
            }
        } else{
            const file = await appwriteService.UploadFile(data.image[0]);

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.CreatePost({
                    ...data,
                    userId: userData.$id
                })
                if(dbPost){
                    // navigate('/post/'+dbPost.$id)
                    navigate(`/post/${dbPost.$id}`)
                } 
            }
        }
    }

    const slugTransform = 
  return (
    <div>PostForm</div>
  )
}

export default PostForm