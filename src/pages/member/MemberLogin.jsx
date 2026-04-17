import React from 'react';
import { useForm } from 'react-hook-form';

const MemberLogin = () => {

    const { 
        register, handleSubmit, getValues, 
                formState: {isSubmitting, isSubmitted, errors}
        } = useForm({mode:"onChange"});
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

    const login = handleSubmit(async (memberLoginRequestDTO) => {


        // 1. 어디로 -> http://localhost:10000/api/members/join
        // 2. 어떤 메서드로 -> POST
        // 3. 데이터를 어디에? -> request body
        // 4. 데이터의 포멧(타입, 양식) ->  
        await fetch("http://localhost:10000/api/members/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberLoginRequestDTO)
        })
        .then(async (res) => {
            if(!res.ok) {
                const error = await res.json()
                console.log(error)
                throw new Error(error?.message)
            }
            return res.json()
        })
        .then((res) => {
            // 정상 응답일 때
            const {message, data} = res
            console.log(message)
            console.log("로그인 한 유저 정보",data)
        })
        .catch((err) => {
            // error 처리!
            alert(err.message)
        })

    })

    return (
        <div>
            <form onSubmit={login}>
                <div>
                    <p>이메일</p>
                    <input 
                        {...register("memberEmail", {
                            required: true,
                            pattern: {
                                value: emailRegex
                            }
                        })}
                    />
                    {errors && errors?.memberEmail?.type === "required" && (
                        <p>이메일을 입력하세요</p>
                    )}

                    {errors && errors?.memberEmail?.type === "pattern" && (
                        <p>이메일 양식에 맞게 입력해주세요.</p>
                    )}
                </div>
                <div>
                    <p>비밀번호</p>
                    <input 
                        {...register("memberPassword", {
                            required: true,
                            pattern: {
                                value: passwordRegex
                            }
                        })}
                    />
                    {errors && errors?.memberPassword?.type === "required" && (
                        <p>비밀번호를 입력해주세요.</p>
                    )}
                    {errors && errors?.memberPassword?.type === "pattern" && (
                        <p>소문자, 숫자, 특수문자를 각 하나씩 포함한 8자리 이상이여야 합니다.</p>
                    )}
                </div>
                <button disabled={isSubmitting}>로그인</button>
            </form>
        </div>
    );
};

export default MemberLogin;