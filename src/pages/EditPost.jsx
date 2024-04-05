import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.GetPost(slug).then((post)=>{
                console.log("--------posts----", post)
                if(post){
                    setPosts(post)
                    console.log("--------posts----", post)
                }
            })
        } else{
            navigate('/')
        }
    },[slug, navigate])
  return post ? <div className='py-8'>
    <Container>
        <PostForm {...post}/>
    </Container>
  </div>: null
}

export default EditPost