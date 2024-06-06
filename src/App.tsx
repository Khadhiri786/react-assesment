import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import FilterPanel from "./Components/FilterPanel";
import BarChart from "./Components/BarChart";

const App: React.FC = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(
    [] as any
  );
  const [chartData, setChartData] = useState([] as any);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategories.length) {
      fetch(`https://dummyjson.com/products/category/${selectedCategories}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedCategoryProducts(data?.products);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [selectedCategories, setSelectedCategoryProducts]);

  const chartValues: any = chartData?.map((item: any) => {
    return { name: item.title, y: item.stock };
  });

  const handleClearFilter = () => {
    setSelectedCategories("");
    setSelectedCategoryProducts([]);
    setSelectedProducts([]);
    setSelectedCategories("");
    setChartData([]);
    setDisableButton(false);
  };
  return (
    <Container>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, minWidth: "200px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Filters</Typography>
            <Button onClick={handleClearFilter}>Clear</Button>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
          <FilterPanel
            categories={allCategories}
            products={selectedCategoryProducts}
            sendSelectedCategories={(category: string) => {
              setSelectedCategory(category);
              setSelectedCategories(category);
              setDisableButton(false);
            }}
            sendSelectedProducts={(products: string[]) => {
              setSelectedProducts(products);
              setDisableButton(false);
            }}
            selectedProducts={selectedProducts}
            selectedCategory={selectedCategory}
            runReport={() => {
              const chartValue = selectedCategoryProducts.filter((obj: any) =>
                selectedProducts.includes(obj.title)
              );
              setChartData(chartValue);
              if (selectedProducts.length && selectedCategories) {
                setDisableButton(true);
              }
            }}
            disableButton={disableButton}
          />
        </Paper>
        <Box sx={{ flexGrow: 1 }}>
          <BarChart data={chartValues} />
        </Box>
      </Box>
    </Container>
  );
};

export default App;
