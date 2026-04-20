import React, { useEffect, useState } from 'react';
import useFetch from './_function/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const PostUpdate = () => {

    const {id} = useParams()
    const [post, setPost] = useState({})
    const {message, data} = useFetch(`http://localhost:10000/api/posts/${id}`)
    const { register, reset, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}} = useForm({mode:"onChange"});
    const navigate = useNavigate()

    const postUpdate = async (postUpdateRequestDTO) => {
        await fetch(`http://localhost:10000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
            ,body: JSON.stringify(postUpdateRequestDTO)
        })
        .then((res) => {
            console.log("성공시 응답", res)
            navigate(`/posts/read/${id}`)
        })
        .catch((err) => {
            console.error("실패시 응답", err)
        })
    }
        
    useEffect(() => {
        if(data){
            setPost(data)

            reset({
                postTitle: data.postTitle,
                postContent: data.postContent
            })
        }
    }, [data, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(postUpdate)}>
                <div>
                    <p>게시판 제목</p>
                    <input 
                        {...register("postTitle", {
                            required: true,
                        })}
                    />
                    {errors && errors?.postTitle?.type === "required" && (
                        <p>게시글 제목을 입력하세요</p>
                    )}
                </div>
                <div>
                    <p>게시판 내용</p>
                    <input 
                        {...register("postContent", {
                            required: true,
                        })}
                    />
                    {errors && errors?.postContent?.type === "required" && (
                        <p>게시글 내용을 입력하세요.</p>
                    )}
                </div>
                <button disabled={isSubmitting}>게시글 작성</button>
            </form>
        </div>
    );
};

export default PostUpdate;