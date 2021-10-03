import { useRef, useEffect } from "react";

const usePrevious = value => {

    const valueRef = useRef( null );

    useEffect( () => valueRef.current = value );

    return valueRef.current;
}

export default usePrevious;
export { usePrevious };