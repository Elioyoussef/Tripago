import {useState, useEffect, useRef} from 'react';

const useFetch = (url, _options) => {
    const [data, setData] = useState(null)
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState(null)
    const options = useRef(_options).current

    useEffect(() => {
        const controller = new AbortController()
        console.log(options)
        const fetchData = async () => {
            isLoading(true) 
            try {
                const res = await fetch(url, {signal: controller.signal})
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                const json = await res.json()
                
                isLoading(false)
                setData(json)
            } catch(err){
                if(err.name === "AbortError"){
                    console.log('fetch was aborted')
                } else{
                    isLoading(false)
                    setError('elio')
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url, options])
    
    return { data, loading, error}
}

export default useFetch;