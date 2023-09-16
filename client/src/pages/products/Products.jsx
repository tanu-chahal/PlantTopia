import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { plants } from "../../utils/data.js";
import Card from "../../components/card/Card.jsx";

function Products() {
  const [category, setCategory]=useState("All");
  const [sort, setSort]=useState("sales");
  const [price, setPrice]=useState(null);
  const handleCategory = (e) => {
    setCategory(e.target.value)
  };
  const handleSortType = (e) => {
    setSort(e.target.value)
  };
  const handlePrice = (e) => {
    setPrice(e.target.value)
  };

  function sortPlantsByAttribute(plants, sortBy) {
    const sortedPlants = [...plants];
  
    if (sortBy === 'rating') {
      sortedPlants.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      sortedPlants.sort((a, b) => a.price - b.price); 
    }
    else if (sortBy === 'sales') {
      sortedPlants.sort((a, b) => b.sales - a.sales); 
    }
    return sortedPlants;
  }
  
  const filteredPlants = sortPlantsByAttribute(plants, sort).filter((plant) => category!=="All" ? plant.category === category : plant.category!==null).filter(p=> price ? p.price<=price : p.price>=0);

  return (
    <Box
      className="Products"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        overflow: "auto",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="lg"
        className="top"
        sx={{
          py:5,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 0,
          justifyContent:'flex-end',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategory}
            sx={{ width: "200px" }}
          >
            <MenuItem value='All'>All</MenuItem>
            <MenuItem value='Herb Plants'>Herb Plants</MenuItem>
            <MenuItem value='Floral Plants'>Floral Plants</MenuItem>
            <MenuItem value='Natural Plants'>Natural Plants</MenuItem>
            <MenuItem value='Artificial Plants'>Artificial Plants</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="price">Price</InputLabel>
          <Select
            labelId="price"
            id="price-select"
            value={price}
            label="Price"
            onChange={handlePrice}
            sx={{ width: "200px",color:'black', outlineColor: 'black' }}
          >
            <MenuItem value={300}> {'<='} 300</MenuItem>
            <MenuItem value={500}>{'<='} 500</MenuItem>
            <MenuItem value={700}>{'<='} 700</MenuItem>
            <MenuItem value={1000}>{'<='} 1000</MenuItem>
            <MenuItem value={1500}>{'<='} 1500</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{mx:'auto'}}>
          <InputLabel id="sort-by">Sort By</InputLabel>
          <Select
            labelId="sort-by"
            id="sort-by-select"
            value={sort}
            label="Sort By"
            onChange={handleSortType}
            sx={{ width: "200px" }}
          >
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="createdAt">Newest</MenuItem>
            <MenuItem value="sales">Popular</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
      </Container>

      <Box
        className="bottom"
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight:"500px",
        }}
      >
        {filteredPlants.length!==0 ? filteredPlants.map((p) => {
          return (
            <Card
              key={p.id}
              name={p.plantName}
              img={p.img}
              category={p.category}
              price={p.price}
              rate={p.rating}
              desc={p.desc}
            />
          );
        }):
        <Typography component="h4" variant="h6" color="secondary">
         No Items Found.
        </Typography>
      }
      </Box>
    </Box>
  );
}

export default Products;