class Project extends React.Component {
    constructor(){
        super();
        this.state = {
            proj: {
                skills: []
            }
            , bided: true
            , bidVal: 0
        };
    }

    componentDidMount(){
        let urlpar = (window.location.href).split('?')[1];
        let id = "";
        if (urlpar.split('=')[0] === "id"){
            id = urlpar.split('=')[1];
        }
        axios.get('http://localhost:2424/project/'+id ,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    proj:response.data
                });
            })
            .catch(function (error) {
                console.log(error);
                window.location.href = './login.html';
            })
            .then(function () {});

        axios.get('http://localhost:2424/bid/'+id ,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data === ""){
                    this.setState({
                        bided: false
                    });
                }
                else{
                    this.setState({
                        bided: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                window.location.href = './login.html';
            })
            .then(function () {});
    }

    handleChange = event => {
        this.setState({ bidVal: event.target.value });
    };

    submitBid = event => {
        event.preventDefault();
        axios.post('http://localhost:2424/submitBid?projectId='+this.state.proj['id']+'&bidAmount='+this.state.bidVal ,{},{
            headers:{
                'Content-Type': 'application/json',
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
            <main className="main">
                <div className="main-top">
                    <span className="main-top-right">
                        <img className="prj-img" src={this.state.proj['imageUrl']} alt="profile" width="220px" height="220px"/>
                    </span>
                    <span className="main-top-left">
                        <h1 className="prj-name">{this.state.proj['title']}</h1>
                        {(this.state.proj['deadline'] > Date.now())?
                            ( <i className="far fa-clock aw-icon aw-grey"/>
                            ):( <i className="far fa-clock aw-icon aw-red "/> )
                        }
                        {(this.state.proj['deadline'] > Date.now())?
                            (
                                <p className="aw-text aw-grey">
                                    {"زمان باقی مانده: "
                                    + Math.floor((this.state.proj['deadline']-Date.now())/3600000)
                                    + " ساعت و "
                                    + Math.floor(((this.state.proj['deadline']-Date.now())%3600000)/60000)
                                    + " دقیقه"
                                    }
                                </p>
                            ):( <p className="aw-text aw-red">مهلت تمام شده</p> )
                        }
                        <br/>
                        <i className="fa fa-dollar-sign aw-icon aw-blue"/>
                        <p className="aw-text aw-blue">{"بودجه: " + this.state.proj['budget'] + " تومان"}</p>
                        <br/>
                        {(this.state.proj['deadline'] <= Date.now()) &&
                            <i className="fa fa-check aw-icon aw-green"/>
                        }
                        {(this.state.proj['deadline'] <= Date.now()) &&
                            <p className="aw-text aw-green">برنده: بزودی</p>
                        }
                        <br/>
                        <h3 className="prj-bio-title">توضیحات</h3>
                        <p className="prj-bio">{this.state.proj['description']}</p>
                    </span>
                </div>
                <div className="main-skills">
                    <h3 className="prj-skills-title">مهارت‌های لازم:</h3>
                    <div className="prj-skills">
                        <ul className="skills-list">
                            {
                                this.state.proj['skills'].map((skill) => {
                                    return(
                                        <li className="skill-block">
                                            <span className="skill-title">{skill['name']}</span>
                                            <span className="skill-point pb">{skill['point']}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {(this.state.proj['deadline'] <= Date.now()) &&
                    <div className="main-bid">
                        <i className="fa fa-exclamation-triangle aw-red bid-aw"/>
                        <p className="bid-msg aw-red">مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</p>
                        <br/>
                    </div>
                }
                {(this.state.proj['deadline'] > Date.now() && this.state.bided) &&
                    <div className="main-bid">
                        <i className="fa fa-check aw-green bid-aw"/>
                        <p className="bid-msg aw-green">شما قبلا پیشنهاد خود را ثبت کرده اید</p>
                        <br/>
                    </div>
                }
                {(this.state.proj['deadline'] > Date.now() && !this.state.bided) &&
                    <div className="main-bid">
                        <h3 className="bid-title">ثبت پیشنهاد</h3>
                        <form className="prj-bid" onSubmit={this.submitBid}>
                            <div className="bid-cont">
                                <input className="bid-input" name="bidAmount" type="number" onChange={this.handleChange} placeholder="پیشنهاد خود را وارد کنید"/>
                                <input hidden name="projectId" type="text" value={this.state.proj['id']}/>
                                <p className="bid-unit">تومان</p>
                            </div>
                            <input className="bid-send" type="submit" value="ارسال"/>
                        </form>
                    </div>
                }
            </main>
        );
    }
}