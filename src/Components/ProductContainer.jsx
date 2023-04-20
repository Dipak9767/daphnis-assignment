import {  Flex,Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'


const ProductContainer = ({ allProducts, categories }) => {
    const [products, setProducts] = useState([]);

    const filterHandler = (e) => {
        const val = (e.target.value).toLowerCase()
        if (val === 'all') {
            setProducts(allProducts)
        } else {
            const filteredProducts = allProducts.filter((item) => val === item.category.toLowerCase());
            setProducts(filteredProducts)
        }
    }

    const searchHandler = (e) => {
        const val = (e.target.value).toLowerCase()
        if (val === '') {
            setProducts(allProducts)
        } else {
            const filteredProducts = allProducts.filter((item) => item.title.toLowerCase().includes(val));
            setProducts(filteredProducts)
        }
    }

    useEffect(() => {
        setProducts(allProducts)
    }, [allProducts])


    return (
        <Flex
            w={'100vw'}
            h={'90vh'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'10px'}
        >
            <Flex w={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={{ base: 'column', md: 'row' }}
                gap={{ base: '5px', md: '1rem' }}
                p={4}
            >
                <Select placeholder='Select Category' width={{ base: "60%", md: "30%" }} onChange={filterHandler}>
                    {
                        categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))
                    }
                </Select>
                <Input
                    placeholder='Search'
                    type="text"
                    variant="filled"
                    width={{ base: "60%", md: "30%" }}
                    onChange={searchHandler}
                />
            </Flex>
            <Flex
                w={'100%'}
                h={'80%'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={'1rem'}
                flexWrap={'wrap'}
                overflow={'auto'}
                p={'10px'}
            >

                {
                    products.length>0 ?
                        products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                        :
                        <Text fontSize={'25px'}>No Produts</Text>
                }
            </Flex>
            
        </Flex>
    )
}

export default ProductContainer