import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const ProductCard = ({ product }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <Card maxW='sm' width={'400px'} height={!isExpanded?'550px':'auto'} border={'1px solid #e1e2f7'}>
            <CardBody display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Image
                    src={product.image}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    width={{ base: '150px' }}
                    height={{ base: '200px' }}
                    objectFit={'contain'}
                />
                <Stack mt='6' spacing='2'>
                    <Heading size='md'noOfLines={1} >{product.title}</Heading>
                    <Text fontSize={'15px'}>
                        {isExpanded ? (product.description) : (product.description).slice(0, 150)}
                        {product.description.length > 150 && !isExpanded && (
                            <Text as="span" color="blue" cursor="pointer" onClick={handleToggle}>
                                ...Read More
                            </Text>
                        )}
                        {isExpanded && (
                            <Text as="span" color="blue.500" cursor="pointer" onClick={handleToggle}>
                                ...Show Less
                            </Text>
                        )}
                        
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        ${product.price}
                    </Text>
                </Stack>
            </CardBody>
            
            <CardFooter marginTop={'-20px'}>
                <ButtonGroup spacing='10'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Text fontSize={'20px'}>{product.category}</Text>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default ProductCard