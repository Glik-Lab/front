import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isUserLoggedIn } from '../utils/auth';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.replace('/login')
        }
    }, [router])

    return (
        <>{children}</>
    )
}

export default ProtectedRoutes