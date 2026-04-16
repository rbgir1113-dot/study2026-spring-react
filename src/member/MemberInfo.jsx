import React, { useEffect, useState } from 'react';

const MemberInfo = () => {
    const [member, setMember] = useState(null);

    useEffect(() => {
        const getMemberInfo = async () => {
          try {
            const response = await fetch("http://localhost:10000/api/members/1")
            if(!response.ok) {
              const {message, data} = await response.json()
              aletrt(message)
            }
            const {message, data} = await response.json()
            setMember(data)
        } catch (err) {
            console.error(err.message)
        }
      }
      getMemberInfo()
      }, []) 



    return (
        <div>
          <p>ID: {member?.id}</p>
          <p>이메일: {member?.memberEmail}</p>
          <p>이름: {member?.memberName}</p>
        </div>
    );
};

export default MemberInfo;