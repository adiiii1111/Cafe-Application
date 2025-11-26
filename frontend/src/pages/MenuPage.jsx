import React, { useEffect, useState } from "react";
import { fetchMenu } from "../api/api";
import { Grid, Container } from "@mui/material";
import MenuItemCard from "../components/MenuItemCard";

function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu().then((res) => setMenu(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MenuPage;
