import React from 'react';
import { withRouter, Redirect } from 'react-router';


class MultipleChoice extends React.Component {
    state = {
        choices: [],
        selected: {}
    }

    componentDidMount() {
        let choices = this.props.choices;
        for (var key of choices) {
            this.state.selected[key] = false;
        }
        this.setState({
            choices: choices,
        })
    }

    handleChange = (e) => {
        // console.log(e.currentTarget)
        // console.log(e.currentTarget.firstChild.checked)
        // this.state.selected[label] = e.currentTarget.firstChild.checked;
        console.log(this.state.selected)
        this.setState({
            selected: {
                ...this.state.selected,
                [e.currentTarget.id]: e.currentTarget.firstChild.checked
            }
        })
    }

    handleClearAll = (e) => {
        // console.log(e.currentTarget)
        // console.log(e.currentTarget.firstChild.checked)
        // this.state.selected[label] = e.currentTarget.firstChild.checked;
        console.log(this.state.selected)
        let choices = this.state.choices;
        let selected = {}
        for (var key of choices) {
            selected[key] = false;
            document.getElementById(key).firstChild.checked = false
            // console.log(document.getElementById(key).firstChild.checked = false)
        }
        this.setState({
            selected: selected,
        })
    }

    render() {
        console.log(this.state.selected)
        return (
            <div class="container-fluid">
                <div class="row row-cols-2" style={{flexDirection: "row"}}>
                    {this.state.choices.map((label, index) => {
                        if (label == "clearAll") {
                            return (
                                <div class="col">
                                <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                                    id={label} onChange={this.handleClearAll}>
                                    <input type="checkbox" id={`input-checkbox-ClearAll`} class="pz-control__input custom-control-input" />
                                    <label class="pz-control__label custom-control-label custom-control-label--small-text" for={`input-checkbox-ClearAll`}>都没有
                                    </label>
                                </div>
                                </div>
                            )
                        } else {
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
                        }
                    })}
                </div>

            </div>
        )
    }
}

const multipleChoice = withRouter(MultipleChoice);
export default MultipleChoice;