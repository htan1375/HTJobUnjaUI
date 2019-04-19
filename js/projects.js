class Projects extends React.Component {
    constructor(){
        super();
        this.state = {
            projs: []
        };
    }
    componentDidMount(){
        axios.get('http://localhost:2424/project')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    projs:response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    }
    render() {
        return(
            <div>{
                this.state.projs.map((proj) => {
                    return (
                        <li className="home-proj"><a href={"./project?id="+proj['id']}>
                            <img className="home-prj-img" src={proj['imageUrl']} alt="profile" width="160px" height="160px"/>
                            <h1 className="home-prj-name">{proj['title']}</h1>
                            <p className="home-prj-timeout">مهلت تمام شده</p>
                            <p className="home-prj-bio">{proj['description']}</p>
                            <p className="home-prj-price">بودجه: {""+proj['budget']} تومان</p>
                            <li className="home-skill-title">مهارت‌ها:</li>
                            <ul className="home-skill-list">{
                                proj['skills'].map((skill) => {
                                    return(
                                        <li className="home-skill">{skill['name']}</li>
                                    )
                                })
                            }
                            </ul>
                        </a></li>
                    )
                })
            }</div>
        )
    }
}