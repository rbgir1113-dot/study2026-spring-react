import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const MemberInfo = () => {
    // 1번 회원 정보를 조회
    // 1번 회원 정보를 모두 화면에 출력하기
    const [member, setMember] = useState({})

    // 다이나믹 파라미터 useParams()
    // 쿼리스트링 useSearchParams()
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()

    useEffect(() => {
        const getMemberInfo = async () => {
            try {
                const response = await fetch(`http://localhost:10000/api/members/${id}`)
                if(!response.ok) {
                    const {message} = await response.json()
                    alert(message)
                    // 예외에 따른 핸들링 코드
                }
                const {message, data} = await response.json()
                setMember(data)
            } catch (err) {
                console.log(err.message)
            }
        }

        getMemberInfo()
    }, [])

    // 회원탈퇴 
    const withdraw = async () => {
        await fetch(`http://localhost:10000/api/members/${id}`, {
            method: "DELETE"
        })
        .then(async (res) => {
            if(!res.ok){
                const error = await res.json()
                throw new Error(error?.message)
            }
            return res.json()
        }) 
        .then((res) => {
            console.log(res)
            navigate("/members/member-list")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <p>아이디: {member?.id}</p>
            <p>이메일: {member?.memberEmail}</p>
            <p>이름: {member?.memberName}</p>
            <Link to={`/members/member-update/${id}`}>회원정보 수정</Link>
            <button onClick={withdraw}>회원탈퇴</button>
        </div>
    );
};

export default MemberInfo;