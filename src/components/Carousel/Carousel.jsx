import { Carousel } from "react-responsive-carousel";

export default function Carousel$1(props) {
   const { data, name } = props;

   console.log(data);

   return (
      <Carousel autoPlay>
         {data.length > 0 &&
            data.map((item, i) => (
               <>
                  <img
                     src={item}
                     onError={(e) =>
                        (e.target.src = "https://jubelio.com/wp-content/uploads/2020/03/01-1.png")
                     }
                     alt={`${name}_${i}`}
                  />
                  <p className="legend">{name}</p>
               </>
            ))}
      </Carousel>
   );
}
