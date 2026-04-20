import React from 'react';
import { useForm } from 'react-hook-form';
import useFetch from './_function/useFetch';

// 포스트 작성
const PostWrite = () => {

    const { register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}} = useForm({mode:"onChange"});

    const postWrite = async (postWriteRequestDTO) => {
      const url = "http://localhost:10000/api/posts"
      const options = {
        method : "POST",
        headers: {
          "Content-Type" : "application/json"
        }
        ,body : JSON.stringify(postWriteRequestDTO)
      }
      .then((res) => {
        console.log("성공시 응답", res)
      })
      .then((err) => {
        console.log("실패시 응답", err)
      })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(postWrite)}>
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
                <button disabled={isSubmitting}>회원가입</button>
            </form>
        </div>
    );
};

export default PostWrite;