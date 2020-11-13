import React from 'react';
import { withRouter, Redirect } from 'react-router';


class SlideChoice extends React.Component {
    state = {
        choiceMap: [],
        select: 0,
    }

    componentDidMount() {
        let choiceMap = this.props.choiceMap;
        console.log(this)
        this.setState({
            choiceMap: choiceMap,
        })
    }

    handleChange = (e) => {
        console.log(e.currentTarget.id)
        this.setState({
            select: e.currentTarget.id
        })
    }

    render() {
        let partition = 97.5 / (this.state.choiceMap.length-1);
        return (
            <div id="radios" class="r-radio-slider__container">
                <div class="r-radio-slider__rail">
                    {this.state.choiceMap.map((label, index) => {
                        console.log(partition * index);
                        if (index == 0) {
                            return (
                                <div id={index} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${index}`}></input>
                                    <label for={`radio-slider-option-${index}`} class="r-radio-slider__label" style={{left: `2.5%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">testtesttesttest</p><p class="radio-slider__subtitle">testtesttesttest</p>
                                    </label>
                                    <span style={{left: `2.5%`}} class="r-radio-slider__btn"></span>
                                </div>
                            )
                        } else {
                            return (
                                <div id={index} onClick={this.handleChange}>
                                    <input name="options" type="radio" tabindex="0" id={`radio-slider-option-${index}`}></input>
                                    <label for={`radio-slider-option-${index}`} class="r-radio-slider__label" style={{left: `${partition * index}%`, right: "auto", maxWidth: "20%"}}>
                                        <p class="radio-slider__title">testtesttesttest</p><p class="radio-slider__subtitle">testtesttesttest</p>
                                    </label>
                                    <span style={{left: `${partition * index}%`}} class="r-radio-slider__btn"></span>
                                </div>
                            )
                        }
                    })}
                    {
                        (
                        <span class="r-radio-slider__track-container" style={{width: `100%`}}>
                            <span class="r-radio-slider__track" style={{width: `${partition * this.state.select + 4}%`}}></span>
                            <span class="r-radio-slider__knob" style={{left: `${partition * this.state.select + 4}%`}}></span>
                        </span>
                        )
                    }

                </div>
            </div>
        )
    }
}

const slideChoice = withRouter(SlideChoice);
export default slideChoice;