import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export function useGetFromStore(value){
    const count = useSelector(value);
    const [state, setState] = useState();
    useEffect(() => {
       setState(count);
    }, [count]);
    return state;
}