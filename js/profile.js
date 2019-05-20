class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            skills: [],
            user: {
                skills: []
            },
            selSkill: "",
            isMy : false
        };
    }

    componentDidMount(){
        let urlpar = (window.location.href).split('?')[1];
        let id = "";
        if (urlpar.split('=')[0] === "id"){
            id = urlpar.split('=')[1];
        }
        if (id === "me") this.state.isMy = true;
        axios.get('http://localhost:2424/user/'+id ,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    user:response.data
                });
            })
            .catch(function (error) {
                console.log(error);
                window.location.href = './login.html';
            })
            .then(function () {});

        axios.get('http://localhost:2424/skills' ,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    skills:response.data
                });
            })
            .catch(function (error) {
                console.log(error);
                window.location.href = './login.html';
            })
            .then(function () {});
    }

    handleChange = event => {
        this.setState({ selSkill: event.target.value });
    };

    addSkill = event => {
        event.preventDefault();
        axios.post('http://localhost:2424/addSkill?userId='+this.state.user['id']+'&skill='+this.state.selSkill+'&point=1',{},{
            headers:{
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        window.location.reload();
    };

    endorseSkill = event => {
        event.preventDefault();
        axios.post('http://localhost:2424/endorseSkill?userId='+this.state.user['id']+'&skill='+event.target.accessKey,{},{
            headers:{
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        window.location.reload();
    };

    render() {
        return(
            <div>
                <img className="section-image" src={this.state.user['profilePictureURL']} alt="profile" width="220px" height="220px"/>
                <h1 className="section-name">{this.state.user['fullName']}</h1>
                <p className="section-job-title">{this.state.user['jobTitle']}</p>
                <p className="section-bio">{this.state.user['bio']}</p>
                <span className="section-add-skill">
                    <h3>مهارت‌ها:</h3>
                        {(this.state.isMy) &&
                            <form className="add-skill-block" onSubmit={this.addSkill}>
                                <select className="add-skill-list" name="skill" onChange={this.handleChange}>
                                    <option value="select">--انتخاب مهارت--</option>
                                    {
                                        this.state.skills.map((skill) => {
                                            return(
                                                <option value={skill['name']}>{skill['name']}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input className="add-skill-btn" type="submit" value="افزودن مهارت"/>
                            </form>
                        }
                </span>
                <div className="section-skills">
                    <ul className="skills-list">
                        {(this.state.isMy) &&
                            this.state.user['skills'].map((skill) => {
                                return (
                                    (skill['endorse']) ? (
                                        <li className="skill-block">
                                            <span className="skill-title">{skill['name']}</span>
                                            <span className="skill-point pb">{skill['point']}</span>
                                        </li>
                                    ) : (
                                        <li className="skill-block">
                                            <span className="skill-title">{skill['name']}</span>
                                            <span className="skill-point pr">{skill['point']}</span>
                                        </li>
                                    )
                                )
                            })
                        }
                        {(!this.state.isMy) &&
                            this.state.user['skills'].map((skill) => {
                                return(
                                    (skill['endorse']) ? (
                                        <li className="skill-block">
                                            <span className="skill-title">{skill['name']}</span>
                                            <span className="skill-point pg">{skill['point']}</span>
                                        </li>
                                    ) : (
                                        <li className="skill-block">
                                            <span className="skill-title">{skill['name']}</span>
                                            <span accessKey={skill['name']} className="skill-point pc" onClick={this.endorseSkill}>{skill['point']}</span>
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}