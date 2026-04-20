import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './_function/useFetch';

// 게시글 전체 목록
const PostList = () => {

    const [posts, setPosts] = useState([])
    const {message, data} = useFetch("http://localhost:10000/api/posts")

    useEffect(() => {
        if(data){
            setPosts(data)
        }
    }, [data])

    const postList = posts?.map(({id, postTitle, memberName}, i) => (
        <li key={i} style={{
            border: "solid 1px black"
        }}>
            <Link to={`/posts/read/${id}`}>
                <span>{id}. {postTitle}</span>
            </Link>
            <p>{memberName}</p>
        </li>
    ))

    return (
        <div>
            <ul>{postList}</ul>
        </div>
    );
};

export default PostList;