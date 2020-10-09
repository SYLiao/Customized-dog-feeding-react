import React from 'react';

class YourDog2 extends React.Component {
    state = {
        name: "",
        email: "",
    }

    handleNameChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    continue = () => {
        localStorage.user_traits = {
            email: this.state.email,
            name: this.state.name
        }
        axios.post("http://localhost:8081/redis/putcache/" + this.state.name,{
            age: 100,
            breedName: "string",
            feedingFrequency: "string",
            gender: "string",
            questionCache: 0,
            treatFrequency: "string",
            weight: 0
        })
            .then(resJson => {
                console.log(1);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div class="step you">
                <Header></Header>
                <div class="you_info">
                    <div class="you__info__inputs">
                        <div class="you__info__inputs__input">
                            <div class="Question">And where does Mooky live?</div>
                                <center><input class="questionInput" type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/></center>
                                </div>
                                <div class="greet__text"><center>We need to make sure we can ship to Mooky's location.</center></div>
                            </div>
                        </div>
                        {emailShow}
                        {buttonShow}
                    </div>
                    );
                }
            }
}
export default YourDog2;