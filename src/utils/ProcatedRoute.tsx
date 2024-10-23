import { useUser } from "../provider/Provider"
import { useNavigate } from "react-router-dom";


const ProcatedRoute = ({ children }: { children: any }) => {
    const { user, isLoading } = useUser();
    const navigate = useNavigate()
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (user) {
        return children
    }

    return navigate('/signin')

}

export default ProcatedRoute
