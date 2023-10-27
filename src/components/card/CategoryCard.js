import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function CategoryCard({ data, content }) {
  const { icons, name } = data;
  const { url } = icons[0];

  const randomColor = getRandomColor();

  const [color, setColor] = useState(
    sessionStorage.getItem(`category-card-color-${name}`)
  );

  useEffect(() => {
    if (color === null) {
      sessionStorage.setItem(`category-card-color-${name}`, randomColor);
      setColor(randomColor);
    }
  }, [color, name, randomColor]);

  return (
    <Link
      className="category-card card animate__fadeIn"
      to={`/player/category-playlist/${data.id}`}
      state={{
        data: data,
        content: content,
      }}
      style={{ backgroundColor: `#${color}` }}
    >
      <h4 className="card-title">{name}</h4>
      <LazyLoadImage effect="blur" src={url} alt="card-img" />
    </Link>
  );
}

export default CategoryCard;
