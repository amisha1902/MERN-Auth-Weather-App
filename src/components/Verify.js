import { useEffect } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import axios from "axios";

const Verify = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                console.log("Verification Request Sent for Token:", token);
                const response = await axios.get(`http://localhost:8080/auth/verify/${token}`);
                console.log("Verification Success:", response);
                alert(response.data.message);
                navigate("/login");
            } catch (error) {
                console.error("Verification Failed:", error);
            }
        };
        verifyUser();
    }, [token, navigate]);

    return <h2>Your Email has been verified</h2>;
};

export default Verify;
