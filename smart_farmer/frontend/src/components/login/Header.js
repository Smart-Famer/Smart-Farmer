import headerImage from "../../images/login_image.png"
export default function Header() {
  return (
    <div className="card text-white">
      <img className="card-img" src={headerImage} />
      <div className="card-img-overlay">
        <div className="row justify-content-center">
          <div className="col-7 allign-items-center">
            <h1 className="card-title" style={{ fontSize: "7vw" }}>
              Smart Farmer
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
