import header from '../Images/Header Image.png'
export default function Header()
{
    return(
        <div className="header" style={{ 
            backgroundImage: `url("https://via.placeholder.com/500")` 
          }}>
            {/* <img className="header-img" src={header}></img> */}
            <h1>Smart Farmer</h1>
        </div>
    )
}