import Card from "./Card";

function CardContainer({ urls, order }) {
  if (Object.keys(urls).length === 0) {
    return <div>not loaded yet</div>;
  }
  return (
    <div className="card-container">
      {order.map((index) => {
        return (
          <Card id={index.toString()} key={index} imageUrl={urls[index]}></Card>
        );
      })}
    </div>
  );
}

export default CardContainer;
