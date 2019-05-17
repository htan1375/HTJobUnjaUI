class Register extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

    }

    registerUser = event => {
        event.preventDefault();
        var body = new URLSearchParams();
        body.append('firstname', event.target.firstname.value);
        body.append('lastname', event.target.lastname.value);
        body.append('username', event.target.username.value);
        body.append('password', event.target.password.value);
        body.append('passrepeat', event.target.passrepeat.value);
        body.append('jobtitle', event.target.jobtitle.value);
        body.append('profilepic', event.target.profilepic.value);
        body.append('bio', event.target.bio.value);
        axios.post('http://localhost:2424/register',body)
            .then(res => {
                console.log(res);
                window.location.href = './home.html';
            });
    };

    render() {
        return(
            <aside className="aside">
                <h3 className="reg-title">ثبت نام کنید</h3>
                <form onSubmit={this.registerUser}>
                    <input className="reg-field" type="text" name="firstname" placeholder="نام"/>
                    <input className="reg-field" type="text" name="lastname" placeholder="نام خانوادگی"/>
                    <input className="reg-field" type="text" name="username" placeholder="نام کاربری"/>
                    <input className="reg-field" type="password" name="password" placeholder="رمز ورود"/>
                    <input className="reg-field" type="password" name="passrepeat" placeholder="تکرار رمز ورود"/>
                    <input className="reg-field" type="text" name="jobtitle" placeholder="عنوان شغلی"/>
                    <input className="reg-field" type="text" name="profilepic" placeholder="لینک عکس پروفایل"/>
                    <input className="reg-field" type="text" name="bio" placeholder="زندگینامه"/>
                    <input className="reg-submit" type="submit" value="ثبت نام"/>
                </form>
                <span className="reg-already">
                    <p className="reg-already-text">قبلا ثبت نام کرده اید؟</p>
                    <a href="./login.html">
                        <p className="reg-already-link">وارد شوید</p>
                    </a>
                </span>
            </aside>
        );
    }
}





