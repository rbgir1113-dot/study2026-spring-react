import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MemberUpdate = () => {
    const [member, setMember] = useState({})
    
    const { id } = useParams()
    const navigate = useNavigate()

    const { 
        register, handleSubmit, getValues, 
        formState: { isSubmitting, isSubmitted, errors }
    } = useForm({ mode: "onChange" });

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

    const update = handleSubmit(async (data) => {
        const { memberPasswordConfirm, ...memberUpdateRequestDTO } = data;

        await fetch(`http://localhost:10000/api/members/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberUpdateRequestDTO)
        })
        .then(async (res) => {
            if (!res.ok) {
                const error = await res.json()
                console.log(error)
                throw new Error(error?.message)
            }
            return res.json()
        })
        .then((res) => {
            const { message, data } = res
            console.log(message)
            console.log("수정된 유저 정보", data)
            navigate("/members")
        })
        .catch((err) => {
            alert(err.message)
        })
    })

    return (
        <div>
            <p>비밀번호</p>
            <input 
              {...register("memberPassword", {
                    required: "비밀번호를 입력하세요",
                    pattern: {
                        value: passwordRegex,
                        message: "숫자, 소문자, 특수문자(!@#) 포함 8자 이상"
                    }})}
            />
            <p>비밀번호 확인</p>
            <input 
              {...register("memberPasswordConfirm", {
                    required: "비밀번호 확인을 입력하세요"
                })} 
            />
            <p>이름</p>
            <input 
              {...register("memberName", {
                      required: "이름을 입력하세요"
                  })} 
            />
            <button onClick={update}>수정하기</button>
        </div>
    );
};

export default MemberUpdate;