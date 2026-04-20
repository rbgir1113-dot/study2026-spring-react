import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from './_function/useFetch';

// 게시물 상세보기
const PostRead = () => {
    const {id} = useParams()

    const [post, setPost] = useState({})
    const {message, data} = useFetch(`http://localhost:10000/api/posts/${id}`)
    const navigate = useNavigate()

    useEffect(() => {
        if(data){
            setPost(data)
        }
    }, [data])

    const {postTitle, postContent, memberName} = post

    const removePost = async () => {
        try {
            const response = await fetch(`http://localhost:10000/api/posts/${id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                const error = await response.json()
                throw new Error(error.message)
            }

            const datas = await response.json()
            const {message} = datas
            alert(message)
            navigate("/posts/list")

        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <p>제목: {postTitle}</p>
            <p>내용: {postContent}</p>
            <p>작성자: {memberName}</p>
            <Link to={`/posts/update/${id}`}>수정하기</Link>
            <button onClick={removePost}>삭제하기</button>
        </div>
    );
};

export default PostRead;