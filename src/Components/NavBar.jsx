import React from 'react'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    useDisclosure,
    Stack,
    Text,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../Redux/Actions';
import { ToastMessage } from '../Utils/ToastMessage';

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { toastMessage } = ToastMessage()
    const user = useSelector((state) => state.user)

    const logOuthandler = () => {
        dispatch({ type: logOutUser })
        localStorage.setItem('daphnisUser',JSON.stringify( { isAuth: false, userInfo: {} }))
        toastMessage({ status: 200, message: "log out success" })
    }


    return (
        <>
            <Box bg='#e1e2f7' px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={20} alignItems={'center'} justifyContent={'space-between'} >
                        <HStack
                            as={'nav'}
                            width={'50vw'}
                            spacing={6}
                            display={{ base: 'none', md: 'flex' }}>
                            <Text fontWeight={'bold'} fontSize={'20px'}>Name : {user.userInfo.name}</Text>
                            <Text fontWeight={'bold'} fontSize={'20px'}>E-Mail : {user.userInfo.email}</Text>

                        </HStack>

                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            {
                                user.isAuth ?
                                    <Button
                                        bg={'#7A6BB0'}
                                        borderRadius="8px"
                                        py="4"
                                        px="4"
                                        lineHeight="1"
                                        size="md"
                                        color={'white'}
                                        className='btn'
                                        onClick={logOuthandler}
                                    >
                                        Log Out
                                    </Button>

                                    :
                                    <Link to={'/'}>
                                        <Button
                                            bg={'#7A6BB0'}
                                            borderRadius="8px"
                                            py="4"
                                            px="4"
                                            lineHeight="1"
                                            size="md"
                                            color={'white'}
                                            className='btn'
                                        >
                                            Log In
                                        </Button>
                                    </Link>
                            }
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Text fontWeight={'bold'}>Name : {user.userInfo.name}</Text>
                            <Text fontWeight={'bold'}>E-Mail : {user.userInfo.email}</Text>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

export default NavBar