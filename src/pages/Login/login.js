import React ,{useState}from 'react';
import { Wrapper,Form ,Input,Button, Title} from './LoginElements';
import { BaseUrl } from '../../helpers/base_url';
import axios from 'axios';
import { useHistory } from "react-router-dom";
const Login=()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const doTheLogin= async() =>  {
      await axios.post(
        BaseUrl + "/employe/login",
        {
          email: email ,
          password: password
        }
      ).then((res) => {
        if (res.status == 200) {
          localStorage.setItem('auth',true);
          localStorage.setItem('id',res.data['employe']['_id']);
          localStorage.setItem('firstname',res.data['employe']['firstName']);
          localStorage.setItem('lastname',res.data['employe']['lastName']);
          localStorage.setItem('email',res.data['employe']['email']);
          localStorage.setItem('restaurant_id',res.data['employe']['restaurant']);
          localStorage.setItem('role',res.data['employe']['role']);
          history.push("/");
        }
        if (res.status == 422)
        {
          alert(`Invalid email or password`);
        }
        console.log(res);
      });
    }
    const handleSubmit = event => {
      event.preventDefault();
      doTheLogin();
    };
    return <>
  <Wrapper>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </Form>
      </Wrapper>
    </>
};  
export default Login;
