import React from "react";
   


function Sidenav(){
  return(
<>

<SwipeableDrawer
        anchor={"left"}
        open={state}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        onClick={() => toggleDrawer(false)}
        sx={{ display: { md: "none" }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px" }, }}
      >
        <Box>
          <Typography variant="body1" sx={{ pb: 2, fontWeight: '600', fontSize: '1.3rem', p: 3 }}>
            <FilterAlt sx={{ fontSize: 34, verticalAlign: 'bottom', color: "#3b5998" }} /> Filters:
          </Typography>

          <Divider />
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', p: 3 }}>Category</Typography>

          <Box sx={{ color: 'rgba(0,47,52,.64)', pl: 3 }}>
            {category.map((category, index) => (
              <Fragment>
                <ListItemButton key={index} disableRipple sx={{ color: '#000', ':hover': { bgcolor: 'transparent' } }}>
                  <ListItemText primary={<Typography onClick={() => { handleFilter({ categoryId: category._id, categoryName: category.name }) }} sx={{ textTransform: 'capitalize', fontWeight: category._id === cat.categoryId && 900 }}>{category.name}</Typography>} />
                  {expand.indexOf(category._id) !== -1 ?
                    <ExpandLess onClick={() => handleCollapse(category._id)} />
                    :
                    <ExpandMore onClick={() => handleCollapse(category._id)} />
                  }
                </ListItemButton>
                {category.Sub_Category.length > 0 &&
                  category.Sub_Category.map((subCat, i) => (
                    <Collapse key={i} in={expand.indexOf(category._id) !== -1 ? true : false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding >
                        <ListItemButton disableRipple onClick={() => { handleFilter({ categoryId: subCat._id }) }} sx={{ color: '#000', p: '8px 16px 8px 32px', ':hover': { bgcolor: 'transparent' } }}>
                          <ListItemText primary={<Typography sx={{ textTransform: 'capitalize', fontWeight: subCat._id === cat.categoryId && 900 }}>{subCat.name}</Typography>} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ))
                }
              </Fragment>
            ))}
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', pl: 3 }}>Location</Typography>
          <Box sx={{ color: 'rgba(0,47,52,.64)', pl: 3 }}>

            {location.map((location, index) => (
              <Fragment>
                <ListItemButton key={index} disableRipple sx={{ color: '#000', ':hover': { bgcolor: 'transparent' } }}>
                  <ListItemText primary={<Typography onClick={() => { handleFilter({ cityId: location._id, cityName: location.name, areaId: '', areaName: '' }) }} sx={{ textTransform: 'capitalize', fontWeight: location._id === city.cityId && 900 }}>{location.name}</Typography>} />
                  {expand.indexOf(location._id) !== -1 ?
                    <ExpandLess onClick={() => handleCollapse(location._id)} />
                    :
                    <ExpandMore onClick={() => handleCollapse(location._id)} />
                  }
                </ListItemButton>
                {location.Areas.length > 0 &&
                  location.Areas.map((street, i) => (
                    <Collapse key={i} in={expand.indexOf(location._id) !== -1 ? true : false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton disableRipple onClick={() => { handleFilter({ areaId: street._id, areaName: street.Subdivison_name }) }} sx={{ color: '#000', p: '8px 16px 8px 32px', ':hover': { bgcolor: 'transparent' } }}>
                          <ListItemText primary={<Typography sx={{ textTransform: 'capitalize', fontWeight: street._id === area.areaId && 900 }}>{street.Subdivison_name}</Typography>} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ))
                }
              </Fragment>
            ))}
          </Box>
          <Divider />
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', pl: 3, p: 2 }}>Price</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", pl: 3, p: 1 }}>
            <FormControl fullWidth variant="standard" sx={{ pl: 3 }}>
              <Input
                placeholder='min price'
                value={inputMinValue}
                startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                onChange={handleMinPrice}
              />
            </FormControl>
            <FormControl fullWidth variant="standard" sx={{ pl: 3 }}>
              <Input
                placeholder='max price'
                value={inputMaxValue}
                startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                onChange={handleMaxPrice}
              />
            </FormControl>
          </Box>
        </Box>
      </SwipeableDrawer>
</>



  )
}
export default Sidenav