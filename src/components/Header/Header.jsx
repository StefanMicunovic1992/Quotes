import './style/Header.css';
import AddQuote from '../AddQuote/AddQuote';
import Login from '../Login/Login';

function Header() {
    return(
        <header>
            <img src="" alt="logo" />
            <div id='loginAndAddQuoteComponents'>
                <AddQuote></AddQuote>
                <Login></Login>
            </div>
        </header>
    )
}

export default Header;