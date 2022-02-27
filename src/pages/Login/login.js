import React ,{useState}from 'react';
import { Wrapper,Form ,Input,Button, Title} from './LoginElements';
const Login=()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const doTheLogin=()=> {
        console.log(email,password);
    }
    return <>
  <Wrapper>
        <Form >
            <Title>Welcome</Title>
          <Input
            type="email"
            name="email"
            onChange={e=>setEmail(e.target.value)}
            placeholder='email'
            value={email}
          />
          <Input
          onChange={e=>setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder='password'
            value={password}
          />
          <Button  onClick={doTheLogin}>Login</Button>
        </Form>
      </Wrapper>
    </>
};  
export default Login;
