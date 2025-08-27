const { Link, NavLink } = ReactRouterDOM
export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <Link to="/home">
                    <img src="assets/img/logo.png" alt="Logo" width={40} heigth={60} />
                </Link>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/books">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}
