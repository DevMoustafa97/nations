import './Header.css'
const Header  = ()=>{
    return (
    <header>
        <section className="app__header container">
        <h1>Where in the world</h1>
        <button onClick={()=>alert('Comming Soon !')}>
        <i className="far fa-moon"></i>
            Dark Mode
        </button>
        </section>
    </header>
    )
}

export default Header