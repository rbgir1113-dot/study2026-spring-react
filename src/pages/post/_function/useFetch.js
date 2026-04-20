import { useEffect, useState } from "react"

const useFetch = (url, options) => {
    const [data, setData] = useState({})
    
    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch(url, options)
            const datas = await response.json()
            setData(datas)
        }
        fetchDatas()
    }, [url])

    return data
}

export default useFetch;