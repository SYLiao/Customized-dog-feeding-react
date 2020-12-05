import React from 'react';
import { withRouter, Redirect } from 'react-router';


class MultipleChoice extends React.Component {
    state = {
        choices: [],
        selectedMap: {}
    }

    componentDidMount() {
        let {choices, selected} = this.props;
        console.log(this.props)
        for (var key of choices) {
            let flag = selected.includes(key);
            this.state.selectedMap[key] = flag;
        }
        console.log(this.state)
        this.setState({
            choices: choices,
        })
    }

    handleChange = (e) => {
        this.setState({
            selectedMap: {
                ...this.state.selectedMap,
                [e.currentTarget.id]: e.currentTarget.firstChild.checked
            }
        }, this.passStateToParent)
        document.getElementById("selectAll").firstChild.checked = false
        document.getElementById("clearAll").firstChild.checked = false
    }

    handleClearAll = (e) => {
        let choices = this.state.choices;
        let selectedMap = {}
        for (var key of choices) {
            selectedMap[key] = false;
            document.getElementById(key).firstChild.checked = false
        }
        document.getElementById("selectAll").firstChild.checked = false
        this.setState({
            selectedMap: selectedMap,
        }, this.passStateToParent)
    }

    handleSelectAll = (e) => {
        let choices = this.state.choices;
        let selectedMap = {}
        for (var key of choices) {
            selectedMap[key] = true;
            document.getElementById(key).firstChild.checked = true
        }

        document.getElementById("clearAll").firstChild.checked = false
        this.setState({
            selectedMap: selectedMap,
        }, this.passStateToParent)
    }

    passStateToParent() {
        this.props.onchange(this.state);
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row row-cols-2" style={{ flexDirection: "row" }}>
                    {this.state.choices.map((label, index) => 
                    (
                        <div class="col">
                            <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                                id={label} onChange={this.handleChange}>
                                <input type="checkbox" id={`input-checkbox-${index}`} class="pz-control__input custom-control-input" checked={this.state.selectedMap[label]}/>
                                <label class="pz-control__label custom-control-label custom-control-label--small-text" for={`input-checkbox-${index}`}>{label}
                                </label>
                            </div>
                        </div>
                    )
                    )}
                    
                </div>
                <div class="row row-cols-2" style={{ flexDirection: "row", marginTop: "15px" }}>
                        <div class="col">
                            <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                                id={"clearAll"} onChange={this.handleClearAll}>
                                <input type="checkbox" id={`input-checkbox-ClearAll`} class="pz-control__input custom-control-input" />
                                <label class="pz-control__label custom-control-label custom-control-label--small-text" for={`input-checkbox-ClearAll`}>都没有
                                            </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="pz-control custom-control text-left pz-control__custom-checkbox custom-checkbox custom-checkbox--transparent-bg"
                                id={"selectAll"} onChange={this.handleSelectAll}>
                                <input type="checkbox" id={`input-checkbox-SelectAll`} class="pz-control__input custom-control-input" />
                                <label class="pz-control__label custom-control-label custom-control-label--small-text" for={`input-checkbox-SelectAll`}>全选
                                                </label>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

const multipleChoice = withRouter(MultipleChoice);
export default MultipleChoice;