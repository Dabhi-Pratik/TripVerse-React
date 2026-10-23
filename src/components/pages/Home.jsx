import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";

function Home() {
  return (
    <Carousel fade>
      <Carousel.Item style={{ height: "95vh" }}>
        <video
          autoPlay
          muted
          loop
          src="https://www.pexels.com/download/video/5735794/"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        ></video>

        <Carousel.Caption>
          <h3 className="display-1">Explore the World Beyond Limits</h3>
          <p className="fs-5">
            Discover breathtaking destinations, hidden gems, and unforgettable
            experiences. Your next adventure begins here.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: "95vh" }}>
        <Image
          src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg"
          alt="slide-2"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        ></Image>
        <Carousel.Caption>
          <h3 className="display-1 text-dark">
            Discover Beautiful Destinations
          </h3>
          <p className="fs-5 text-dark">
            From crystal-clear beaches to majestic mountains, travel to places
            that inspire your soul and create lifelong memories.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: "95vh" }}>
        <Image
          src="https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg"
          alt="third-slide"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
        <Carousel.Caption>
          <h1 className="display-1">Travel. Experience. Remember.</h1>
          <p className="fs-5">
            Explore vibrant cultures, taste local cuisines, and experience the
            world like never before.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
