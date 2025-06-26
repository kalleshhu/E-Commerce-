// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../Context/Context";
// import unplugged from "../assets/unplugged.png"

// const Home = ({ selectedCategory }) => {
//   const { data, isError, addToCart, refreshData } = useContext(AppContext);
//   const [products, setProducts] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     if (!isDataFetched) {
//       refreshData();
//       setIsDataFetched(true);
//     }
//   }, [refreshData, isDataFetched]);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const fetchImagesAndUpdateProducts = async () => {
//         const updatedProducts = await Promise.all(
//           data.map(async (product) => {
//             try {
//               const response = await axios.get(
//                 `http://localhost:8080/api/product/${product.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageUrl = URL.createObjectURL(response.data);
//               return { ...product, imageUrl };
//             } catch (error) {
//               console.error(
//                 "Error fetching image for product ID:",
//                 product.id,
//                 error
//               );
//               return { ...product, imageUrl: "placeholder-image-url" };
//             }
//           })
//         );
//         setProducts(updatedProducts);
//       };

//       fetchImagesAndUpdateProducts();
//     }
//   }, [data]);

//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category === selectedCategory)
//     : products;

//   if (isError) {
//     return (
//       <h2 className="text-center" style={{ padding: "18rem" }}>
//       <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
//       </h2>
//     );
//   }
//   return (
//     <>
//       <div
//         className="grid"
//         style={{
//           marginTop: "64px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         {filteredProducts.length === 0 ? (
//           <h2
//             className="text-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             No Products Available
//           </h2>
//         ) : (
//           filteredProducts.map((product) => {
//             const { id, brand, name, price, productAvailable, imageUrl } =
//               product;
//             const cardStyle = {
//               width: "18rem",
//               height: "12rem",
//               boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
//               backgroundColor: productAvailable ? "#fff" : "#ccc",
//             };
//             return (
//               <div
//                 className="card mb-3"
//                 style={{
//                   width: "250px",
//                   height: "360px",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                   borderRadius: "10px",
//                   overflow: "hidden", 
//                   backgroundColor: productAvailable ? "#fff" : "#ccc",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent:'flex-start',
//                   alignItems:'stretch'
//                 }}
//                 key={id}
//               >
//                 <Link
//                   to={`/product/${id}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <img
//                     src={imageUrl}
//                     alt={name}
//                     style={{
//                       width: "100%",
//                       height: "150px", 
//                       objectFit: "cover",  
//                       padding: "5px",
//                       margin: "0",
//                       borderRadius: "10px 10px 10px 10px", 
//                     }}
//                   />
//                   <div
//                     className="card-body"
//                     style={{
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <h5
//                         className="card-title"
//                         style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
//                       >
//                         {name.toUpperCase()}
//                       </h5>
//                       <i
//                         className="card-brand"
//                         style={{ fontStyle: "italic", fontSize: "0.8rem" }}
//                       >
//                         {"~ " + brand}
//                       </i>
//                     </div>
//                     <hr className="hr-line" style={{ margin: "10px 0" }} />
//                     <div className="home-cart-price">
//                       <h5
//                         className="card-text"
//                         style={{ fontWeight: "600", fontSize: "1.1rem",marginBottom:'5px' }}
//                       >
//                         <i class="bi bi-currency-rupee"></i>
//                         {price}
//                       </h5>
//                     </div>
//                     <button
//                       className="btn-hover color-9"
//                       style={{margin:'10px 25px 0px '  }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         addToCart(product);
//                         alert("Added to cart");
//                       }}
//                       disabled={!productAvailable}
//                     >
//                       {productAvailable ? "Add to Cart" : "Out of Stock"}
//                     </button> 
//                   </div>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;


// src/components/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  /*pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // number of cards per page

  /*initial data fetch*/
  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [isDataFetched, refreshData]);

  /* attach image URLs to each product */
  useEffect(() => {
    if (data.length === 0) return;

    (async () => {
      const withImages = await Promise.all(
        data.map(async (product) => {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            return { ...product, imageUrl: URL.createObjectURL(res.data) };
          } catch (e) {
            console.error("image fetch failed →", product.id, e);
            return { ...product, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setProducts(withImages);
    })();
  }, [data]);

  /*filtering + slice*/
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  /* error*/
  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img
          src={unplugged}
          alt="Error"
          style={{ width: 100, height: 100 }}
        />
      </h2>
    );
  }

  /*UI*/
  return (
    <>
      {/*product grid*/}
      <div
        className="grid"
        style={{
          marginTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
          padding: 20,
        }}
      >
        {currentProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          currentProducts.map((product) => {
            const {
              id,
              brand,
              name,
              price,
              productAvailable,
              imageUrl,
            } = product;

            return (
              <div
                key={id}
                className="card mb-3"
                style={{
                  width: 250,
                  height: 360,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: productAvailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  to={`/product/${id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    flexGrow: 1,
                    display: "block",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    className="product-image"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      padding: 5,
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "calc(100% - 150px)",
                      padding: 10,
                    }}
                  >
                    <div>
                      <h5 style={{ margin: "0 0 8px 0" }}>
                        {name.toUpperCase()}
                      </h5>
                      <i style={{ fontSize: ".8rem" }}>~ {brand}</i>
                    </div>

                    <div className="home-cart-price">
                      <h5 style={{ fontWeight: 600 }}>
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                  </div>
                </Link>

                <button
                  className="btn-hover color-9"
                  style={{ margin: 10 }}
                  disabled={!productAvailable}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    alert("Added to cart");
                  }}
                >
                  {productAvailable ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* pagination controls */}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", margin: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              style={{
                margin: "0 5px",
                padding: "8px 12px",
                backgroundColor: num === currentPage ? "#007bff" : "#e0e0e0",
                color: num === currentPage ? "white" : "black",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
