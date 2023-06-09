import {useState,useEffect} from 'react'
import { Form,Button, Row, Col, ToastHeader } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state)=> state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/';
    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        }
        catch(e){
            toast.error(e?.data?.message || e?.error);
        }
    }
    useEffect(()=>{
        if(userInfo) {
            navigate(redirect)
        }
    },[userInfo,navigate,redirect])
return (
    <FormContainer>
        <h1>Sign in</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}>  
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter password'
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}>  
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant="primary" className='mt-2'>
            Sign in
        </Button>
        </Form>  
    </FormContainer>
)
}

export default LoginScreen
