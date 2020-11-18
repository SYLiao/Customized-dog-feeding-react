import React from 'react';
import { withRouter, Redirect } from 'react-router';


class SingleChoice extends React.Component {
    state = {
        choices: [],
        selected: ""
    }

    componentDidMount() {
        let choices = this.props.choices;
        this.setState({
            choices: choices,
        })
    }

    handleChange = (e) => {
        // console.log(e.currentTarget)
        // console.log(e.currentTarget.firstChild.checked)
        // this.state.selected[label] = e.currentTarget.firstChild.checked;
        for (var key of this.state.choices) {
            if (key != e.currentTarget.id)
            document.getElementById(key).firstChild.checked = false
        }
        this.setState({
            selected: e.currentTarget.id
        })
    }

    // handleClearAll = (e) => {
    //     // console.log(e.currentTarget)
    //     // console.log(e.currentTarget.firstChild.checked)
    //     // this.state.selected[label] = e.currentTarget.firstChild.checked;
    //     console.log(this.state.selected)
    //     let choices = this.state.choices;
    //     let selected = {}
    //     for (var key of choices) {
    //         selected[key] = false;
    //         document.getElementById(key).firstChild.checked = false
    //     }
    //     this.setState({
    //         selected: selected,
    //     })
    // }

    render() {
        console.log(this.state.selected)
        return (
            <div class="container-fluid">
                <div class="row row-cols-2" style={{flexDirection: "row"}}>
                    {this.state.choices.map((label, index) => {
                        return (
                            <div class="col">
                            <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                                id={label} onChange={this.handleChange}>
                                <input type="checkbox" id={`input-checkbox-${index}`} class="pz-control__input custom-control-input" />
                                <label class="pz-control__label custom-control-label custom-control-label--small-text" for={`input-checkbox-${index}`}>{label}
                                </label>
                            </div>
                            </div>

                        )
                    })}
                </div>

            </div>
        )
    }
}

const singleChoice = withRouter(SingleChoice);
export default SingleChoice;