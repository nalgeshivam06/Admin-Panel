import {useState,useEffect} from "react"

const useDebounce = (inputValue,delay=1000)=>{
    const [debounceValue,setDebounceValue] = useState(inputValue);

    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebounceValue(inputValue);
        },delay)

        return ()=>{
            clearTimeout(timer)
        }
    },[inputValue,delay])

    return debounceValue // damn shit! earlier i didn't return this value,  wasted 2hrs to fix the issue 😂
}

export default useDebounce;