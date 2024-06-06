import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  ListItemText,
  Checkbox,
} from "@mui/material";

interface Products {
  id: number;
  title: string;
}

interface Categories {
  slug: string;
  name: string;
  url: string;
}

export interface FilterPanelProps {
  categories: Categories[];
  products: Products[];
  sendSelectedCategories: (category: string) => void;
  selectedCategory: string;
  sendSelectedProducts: (products: string[]) => void;
  selectedProducts: string[];
  runReport: () => void;
  disableButton: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  products,
  sendSelectedCategories,
  sendSelectedProducts,
  selectedCategory,
  selectedProducts,
  runReport,
  disableButton,
}: FilterPanelProps) => {
  const handleProductChange = (event: any) => {
    const value = event.target.value as string[];
    sendSelectedProducts(value);
  };

  const handleCategoryChange = (event: any) => {
    const value = event.target.value as string;

    sendSelectedCategories(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Select Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <MenuItem key={category.slug} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Select Product</InputLabel>
        <Select
          multiple
          value={selectedProducts}
          onChange={handleProductChange}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.title}>
              <Checkbox
                checked={selectedProducts.indexOf(product.title) > -1}
              />
              <ListItemText primary={product.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={runReport}
        disabled={disableButton}
      >
        Run Report
      </Button>
    </Box>
  );
};

export default React.memo(FilterPanel);
