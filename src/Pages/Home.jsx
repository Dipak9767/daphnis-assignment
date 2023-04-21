import React, { useEffect, useState } from 'react'
import ProductContainer from '../Components/ProductContainer'
import axios from 'axios';
import { Box, Button, Flex, Spinner } from '@chakra-ui/react';
import PieChart from '../Components/PieChart';

const Home = () => {
  
  const [allProducts, setAllProducts] = useState([]); // for all products
  const [categories, setCategories] = useState([]) // for categories
  const [loader, setLoader] = useState(true) // for loading
  const [pieData, setPieData] = useState({}) // for categories data to set in pie chart
  const [isPieChart, setIsPieChart] = useState(false) // for conditional rendering of pie chart and analysis button


  // Calculating category data for chart
  const calculateCategories = ({ prods }) => {

    let categoryData = {}

    prods.forEach((item) => {
      let cat = item.category

      categoryData[cat] ? categoryData[cat] = categoryData[cat] + 1
        : categoryData[cat] = 1
    })

    setPieData(categoryData)
  }

  // fetching products and categories
  const fetchProducts = async () => {
    try {
      const productResponse = await axios.get('https://fakestoreapi.com/products');
      const categoryResponse = await axios.get('https://fakestoreapi.com/products/categories');
      
      setAllProducts(productResponse.data)
      setCategories(['All', ...categoryResponse.data])
      setLoader(false)

      calculateCategories({ prods: productResponse.data });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      {
        loader ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Spinner size="xl" color="blue.500" />
          </Box>
          : <>
            <ProductContainer allProducts={allProducts} categories={categories} />
            {
              // conditional rendering for Analysis button
              !isPieChart ?
                <Button
                bg={"RGB(122 107 176)"}
                color={'white'}
                position={'fixed'}
                bottom={{base:'20px',md:"30px"}}
                right={{base:'20px',md:"50px"}}
                  onClick={() => {
                    setIsPieChart(true)
                  }}
                >
                  Analysis
                </Button>
                : ""
            }
            <PieChart pieData={pieData} isPieChart={isPieChart} setIsPieChart={setIsPieChart} />
          </>
      }

    </Flex>
  )
}

export default Home