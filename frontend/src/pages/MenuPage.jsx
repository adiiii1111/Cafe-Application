// import React, { useEffect, useState } from "react";
// import { fetchMenu } from "../api/api";
// import { Grid, Container } from "@mui/material";
// import MenuItemCard from "../components/MenuItemCard";

// function MenuPage() {
//   const [menu, setMenu] = useState([]);

//   useEffect(() => {
//     fetchMenu().then((res) => setMenu(res.data));
//   }, []);

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Grid container spacing={2}>
//         {menu.map((item) => (
//           <Grid item xs={12} sm={6} md={4} key={item.id}>
//             <MenuItemCard item={item} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default MenuPage;
import React, { useEffect, useState } from "react";
import { fetchMenu } from "../api/api";
import {
  Grid,
  Container,
  Typography,
  Box,
  Divider,
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
    <Container sx={{ mt: 4 }}>
      {Object.keys(categories).map((category) => (
        <Box key={category} sx={{ mb: 5 }}>
          {/* CATEGORY TITLE */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {category}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* ITEMS UNDER THIS CATEGORY */}
          <Grid container spacing={2}>
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
