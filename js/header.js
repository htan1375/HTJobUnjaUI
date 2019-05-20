class Header extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

    }

    logout = event => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = './login.html';
    };

    render() {
        return(
            <span className="header-span">
                <a className="header-logo" href="./home.html">
                    <img src="logo/logo%20v1.png" alt="JobUnja" width="auto" height="60px"/>
                </a>
                <div className="header-left">
                    <a className="header_link" href="./profile.html?id=me">حساب کاربری</a>
                    <a className="header_link" href="#" onClick={this.logout}>خروج</a>
                </div>
            </span>
        );
    }
}





