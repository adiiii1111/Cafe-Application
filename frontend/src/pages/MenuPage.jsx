import React, { useEffect, useState } from "react";
import { fetchMenu } from "../api/api";
import {
  Grid,
  Container,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import MenuItemCard from "../components/MenuItemCard";

function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu().then((res) => setMenu(res.data));
  }, []);

  // Group items by category
  const categories = menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {Object.keys(categories).map((category) => (
        <Box
          key={category}
          sx={{
            mb: 8,
            p: 2,
            borderRadius: 4,
          }}
        >
          {/* CATEGORY TITLE */}
          <Chip
            label={category}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "'Playfair Display', serif",
              backgroundColor: "rgba(232, 200, 217, 0.6)",
              color: "#5B4632",
              px: 3,
              py: 2,
              borderRadius: "20px",
              mb: 2,
            }}
          />

          <Divider
            sx={{
              mb: 4,
              backgroundColor: "#CFA66A",
              height: "2px",
              width: "150px",
              borderRadius: 2,
            }}
          />

          {/* ITEMS UNDER CATEGORY */}
          <Grid container spacing={3}>
            {categories[category].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <MenuItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}

export default MenuPage;
