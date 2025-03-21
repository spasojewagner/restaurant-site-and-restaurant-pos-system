import { useEffect, useState } from "react";
import { getUser } from "../https";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/urserSlice";
import { useNavigate } from "react-router-dom";


const useLoadData = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [isLoading, setIsLoading]= useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const { data } = await getUser();
                console.log(data);
                const { _id, name, phone, email, role } = data.data;
                dispatch(setUser({ _id, name, phone, email, role }));

            } catch (error) {
                dispatch(removeUser());
                navigate("/auth");
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [dispatch, navigate])

    return isLoading;

}
export default useLoadData;