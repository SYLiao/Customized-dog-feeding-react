import React from 'react';
import { withRouter, Redirect } from 'react-router';

class DropDown extends React.Component {
    state = {
        choices: [],
        menu: "display-menu",
        selectedValue: null
    }

    componentDidMount() {
        document.addEventListener('click', this.handleHide);
        this.setState({
            choices: this.props.choices,
            selectedValue: this.props.selectedValue
        })
    }

    handleMenu = (event) => {
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
          menu: "",
        })
      }

    handleHide = () => {
        this.setState({
            menu: "display-menu",
        })
    }

    handleSelect = (event) => {
        this.props.onchange(event.currentTarget.innerHTML);
        let profile = this.state.profile;
        this.setState({
            selectedValue: event.currentTarget.innerHTML,
        })
    }

    render() {
        return (
            <div className="dropdown-wrap">
                <div class="pz-select pz-select-1 css-2b097c-container" id="1">
                    <div class="pz-select__control css-u41ve3-control">
                        <div class="pz-select__value-container pz-select__value-container--has-value css-1hwfws3">
                            <div class="pz-select__single-value css-nztp7a-singleValue">{this.state.selectedValue}</div>
                            <div class="css-1v9zfle">
                                <div class="pz-select__input" style={{ display: 'inline-block' }}>
                                    <input class="pz-select__input"  autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-2-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" style={{ boxSizing: 'content-box', width: '2px', background: '0px center', border: '0px', fontSize: 'inherit', opacity: '0', outline: '0px', padding: '0px', color: 'inherit' }} />
                                </div>
                            </div>
                        </div>
                        <div class="pz-select__indicators css-1wy0on6">
                            <div aria-hidden="true" class="pz-select__indicator pz-select__dropdown-indicator css-xbhri0-indicatorContainer" onClick={this.handleMenu}>
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-19bqh2r">
                                    <path fill="#dd4f00" fillRule="nonzero" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class={"pz-select__menu css-i0syzg-menu " + this.state.menu}>
                        <div class="pz-select__menu-list css-11unzgr">
                            {
                                this.state.choices.map((value, index) => (
                                    <div class="pz-select__option pz-select__option--is-focused css-152efi3-option"
                                        id={value} tabindex="-1" onClick={this.handleSelect}>{value}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const dropDown = withRouter(DropDown);
export default dropDown;