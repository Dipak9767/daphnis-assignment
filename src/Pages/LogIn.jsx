import { Button, Flex, FormControl, Heading, Input} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../Redux/Actions'
import { useNavigate } from 'react-router-dom'
import { ToastMessage } from '../Utils/ToastMessage'


const LogIn = () => {
    const [user, setUser] = useState({
        name: "",
        username: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { toastMessage } = ToastMessage()

    // log in handler
    const logInHandler = (e) => {
        e.preventDefault();

        // checking input should be valid 
        if(user.name === '' ||  user.email === ''){
            toastMessage({ status: 400, message: "Missing credentials" })
            return
        }

    
        const userbio = { isAuth: true, userInfo: user } // creating an userinfo
        localStorage.setItem('daphnisUser', JSON.stringify(userbio)) // storing info in localstorage
        
        dispatch({
            type: logInUser,
            payload: userbio
        })
        
        navigate('/home')
        toastMessage({ status: 200, message: "log In success" })
    }
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center" >
            <Flex
                flexDirection="column"
                bg='#e1e2f7'
                p={8}
                borderRadius={8}
                alignItems={'center'}
               
            >
                <Heading mb={6}>Log In</Heading>
                <FormControl isRequired display={'flex'} flexDirection="column" alignItems="center" justifyContent="center" >


                    <Input
                        isRequired
                        placeholder='Name'
                        type="text"
                        variant="filled"
                        mb={6}
                       
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <Input
                        placeholder='E-mail'
                        type="email"
                        variant="filled"
                        value={user.email}
                        w={{base:'auto' , md:'300px'}}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        mb={6}
                    />
                    <Button type='submit' bg={'#7A6BB0'} color={'white'} mb={8} className='btn' onClick={logInHandler}>
                        Log In
                    </Button>
                </FormControl>
            </Flex>
        </Flex>
    )

}

export default LogIn