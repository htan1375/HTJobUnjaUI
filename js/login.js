class Login extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

    }

    loginUser = event => {
        event.preventDefault();
        var body = new URLSearchParams();
        body.append('username', event.target.username.value);
        body.append('password', event.target.password.value);
        axios.post('http://localhost:2424/login',body)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                window.location.href = './home.html';
            });
    };

    render() {
        return(
            <aside className="aside">
                <h3 className="reg-title">ورود به جاب‌اونجا</h3>
                <form onSubmit={this.loginUser}>
                    <input className="reg-field" type="text" name="username" placeholder="نام کاربری"/>
                    <input className="reg-field" type="password" name="password" placeholder="رمز ورود"/>
                    <input className="reg-submit" type="submit" value="ورود"/>
                </form>
                <span className="reg-already">
                    <p className="reg-already-text">عضو جاب‌اونجا نیستید؟</p>
                    <a href="./register.html"><p className="reg-already-link">ثبت نام کنید</p></a>
                </span>
            </aside>
        );
    }
}





