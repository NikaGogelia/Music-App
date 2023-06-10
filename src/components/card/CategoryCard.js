import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CategoryCard({ data }) {
  const {icons, name} = data;
  const { url } = icons[0];
  return (
    <div className="category-card card animate__fadeIn">
      <LazyLoadImage effect="blur" src={url} alt="card-img" />
      <h4 className="card-title">{name}</h4>
    </div>
  );
}

export default CategoryCard;
