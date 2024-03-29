import { registeredUser } from "@/common/reducers/userSlice";

const SignUpResult = () => {


    return(
        <p>welcome {registeredUser.username}</p>
    );
}
export default SignUpResult;