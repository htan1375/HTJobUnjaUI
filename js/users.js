class Users extends React.Component {
    constructor(){
        super();
        this.state = {
            persons: []
        };
    }
    componentDidMount(){
        axios.get('http://localhost:2424/user')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    persons:response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    }
    render() {
        return <div>
            <li className="home-user-search">
                <input className="home-user-search-input" type="text" placeholder="جستجوی نام کاربر"/>
            </li>
            {
                this.state.persons.map((person) => {
                    return(
                        <li className="home-user"><a href={"./profile.html?id="+person['id']}>
                            <img className="home-user-img" src={person['profilePictureURL']} alt="profile" width="45px" height="45px"/>
                            <h3 className="home-user-name">{person['fullName']}</h3>
                            <p className="home-user-job">{person['jobTitle']}</p>
                        </a></li>
                    )
                })
            }
        </div>
    }
}