import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

// fetch로 회원 목록 api에 요청후 
// 회원의 이메일을 모두 화면에 출력하기

const MemberList = () => {

    const [memberList, setMemberList] = useState([])

  useEffect(() => {
        const getMemberList = async () => {
            const response = await fetch("http://localhost:10000/api/members")
            const memberList = await response.json()
            const {message, data} = memberList;
            setMemberList(data)
            console.log(data)
        }

        getMemberList()
  }, [])

  const memberNames = memberList.map(({id,memberName},i) => (
    <li key={i}><Link to={`/members/member-info/${id}`}>{memberName}</Link></li>
  ))

  return (
    <div>
        회원 목록
        <ul>
            {memberNames}
        </ul>
    </div>
  );

  
};

export default MemberList;