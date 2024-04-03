type Placeholder = {
  img_src: string;
  name: string;
  price: number;
  description: string;
};

const Detail = () => {
  const placeholder: Placeholder = {
    img_src: "/src/assets/images/chipotle-mexican-bowl.jpeg",
    name: "Mexican Chipotle Bowl",
    price: 120,
    description: "Spicy bowl theme from Mexico",
  };

  return (
    <>
      <img src={placeholder.img_src} height={200} width={200} />
      <h1>{placeholder.name}</h1>
      <p>{placeholder.description}</p>
      <span>{placeholder.price.toFixed(2)}</span>
    </>
  );
};

export default Detail;
