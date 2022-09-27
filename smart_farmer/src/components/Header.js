import header from '../Images/Header Image.png'
export default function Header()
{
    const myStyle={
        backgroundImage: `url("${header}")`,
        width: '100%',
        height:'50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    return(
        <div className="header" style={myStyle}>
            {/* <img className="header-img" src={header}></img> */}
            <h1>Smart Farmer</h1>
        </div>
    )
}