import {useRouter} from "next/router";
import {useEffect} from "react";

const InvalidLink = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);
}

export default InvalidLink;