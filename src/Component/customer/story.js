import React from 'react';
import { classie } from '../../js/classie';
import { SelectFx } from '../../js/selectFx';
import { FForm } from '../../js/fullscreenForm';
import { Modernizr } from '../../js/modernizr.customer';
import Header from './Header';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import { Card, Col, Row } from 'antd';

class Story extends React.Component {
  state = {
    profile: this.props.profile,
    name: localStorage.getItem("name"),
    progress: 4,
    sensitive: "",
    progressNumber: 0,
    show1: ["is-incomplete", "", "icon"],
    show2: ["is-incomplete", "", "icon"],
    show3: ["is-incomplete", "", "icon"],
    show4: ["is-incomplete", "", "icon"],
    show5: ["is-incomplete", "", "icon"],
	}

	componentDidMount(){
    
    switch(this.state.progress) {
      case 1:
        this.setState({
          show1: ["", "label-color", "icon-story"],
        })
        break;
      case 2:
        this.setState({
          show1: ["", "label-color", "icon-story"],
          show2: ["", "label-color", "icon-story"],
        })
        break;
        case 3:
          this.setState({
            show1: ["", "label-color", "icon-story"],
            show2: ["", "label-color", "icon-story"],
            show3: ["", "label-color", "icon-story"],
          })
          break;
          case 4:
            this.setState({
              show1: ["", "label-color", "icon-story"],
              show2: ["", "label-color", "icon-story"],
              show3: ["", "label-color", "icon-story"],
              show4: ["", "label-color", "icon-story"],
            })
            break;
            case 5:
              let sensitive = "";
              if(this.state.profile.q3.None){
                sensitive += "None";
              }
              else{
                if(this.state.profile.q3.Grains){
                  sensitive += "Grains, ";
                }
                if(this.state.profile.q3.Eggs){
                  sensitive += "Eggs, ";
                }
                if(this.state.profile.q3.Chickens){
                  sensitive += "Chicken, ";
                }
                if(this.state.profile.q3.Grains){
                  sensitive += "Gluten, ";
                }
                if(this.state.profile.q3.Grains){
                  sensitive += "Red Meat, ";
                }
                if(this.state.profile.q3.Grains){
                  sensitive += "Flax, ";
                }
                if(this.state.profile.q3.Grains){
                  sensitive += "potatoes, ";
                }
                sensitive = sensitive.substr(0, sensitive.length - 2);
              }
              this.setState({
                breed: this.state.profile.q2.breed,
                age: this.state.profile.q2.age,
                weight: this.state.profile.q2.weight,
                activeLevel: this.state.profile.q2.activeLevel,
                sensitive: sensitive,
                show1: ["", "label-color", "icon-story"],
                show2: ["", "label-color", "icon-story"],
                show3: ["", "label-color", "icon-story"],
                show4: ["", "label-color", "icon-story"],
                show5: ["", "label-color", "icon-story"],
              })
              break;
      default:
        break;
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({update: nextProps.progress});
  }

    render(){
        return(
              <div class="pz-slide__pet-overview-card pz-pet-overview-card pet-overview-card offset-lg-1 d-none d-lg-block">
                  <div class="pet-overview-card__header text-center text-uppercase bg-sun">
                    <div class="pet-overview-card__eyebrow">
                      <div class="badge--tailored">
                        <img src="https://cdn.shopify.com/s/files/1/0276/0337/0068/files/tailored-recipe-for_3x_1cb939b7-dd7d-4dae-989e-d2784b7e56b6.png" alt="Recipe Tailored For" class="icon" /></div>
                    </div>
                    <h2 class="pet-overview-card__title font-ginto-nord-black">Mookey</h2></div>
                  <div class="pet-overview-card__body">
                    <div class="pet-overview-card__list">
                    <div class={"pet-overview-card__list-item " + this.state.show1[0]}>
                        <div class="pet-overview-card__list-item-icon"><svg t="1605225819706" class={this.state.show1[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7972" width="200" height="200"><path d="M541.013333 250.88c29.866667-10.24 52.053333-38.4 55.466667-69.973333 2.133333-20.053333-2.133333-38.826667-11.946667-54.186667L529.92 32a21.589333 21.589333 0 0 0-37.12 0l-54.613333 94.72c-7.253333 12.8-11.52 27.733333-11.52 43.946667 0 56.32 55.466667 100.266667 114.346666 80.213333z m164.266667 428.373333l-42.666667-42.666666-46.08 45.653333c-55.466667 55.466667-152.746667 55.893333-208.64 0l-45.653333-45.653333-46.506667 45.653333C288 709.973333 250.88 725.333333 211.626667 725.333333c-31.146667 0-59.733333-9.813333-83.626667-26.026666V853.333333c0 46.933333 38.4 85.333333 85.333333 85.333334h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333334v-154.026666c-32 21.76-72.96 32-116.906667 22.186666-28.16-5.973333-53.333333-21.76-73.813333-42.24zM768 384h-213.333333V341.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v42.666667H256c-70.826667 0-128 57.173333-128 128v62.293333c0 36.266667 21.333333 71.253333 55.893333 82.773334 31.146667 10.24 64.853333 2.56 86.613334-19.626667l91.306666-90.88 90.88 90.88c32.426667 32.426667 85.76 32.426667 118.186667 0l91.306667-90.88 90.88 90.88c18.346667 18.346667 43.946667 26.88 70.4 23.466667 42.24-5.546667 72.106667-45.226667 72.106666-87.893334v-60.586666A127.274667 127.274667 0 0 0 768 384z" p-id="7973"></path></svg></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show1[1]}>Age</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show1[1]}>{this.state.profile.q2.age}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show2[0]}>
                        <div class="pet-overview-card__list-item-icon"><svg t="1605226246732" class={this.state.show2[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12468" width="200" height="200"><path d="M282.966 538.902c91.744-20.227 121.052-102.374 80.805-195.151-15.893-36.74-80.083-162.643-106.399-214.138-14.242 11.97-26.006 25.695-34.262 40.969-31.373 57.792-33.541 186.069-49.33 346.235 28.586 18.989 65.326 31.682 109.186 22.085z m655.525-216.72c-0.826-21.465-19.506-37.564-40.661-35.396-35.605 3.61-90.403 3.61-137.153-20.022-76.368-38.7-43.446-94.53-106.502-153.458-63.88-59.752-227.762-66.254-337.772-19.092 43.136 87.617 106.398 218.37 121.568 260.683 43.551 122.189-23.839 221.467-127.967 252.942-60.991 18.473-109.083 8.463-145.1-10.835-3.095 24.458-6.605 49.535-10.63 75.026-11.248 70.588-26.315 129.103-41.176 175.233-7.946 11.352-12.59 25.078-12.59 39.938 0 38.598 31.27 69.867 69.867 69.867 3.61 0 7.12-0.31 10.628-0.826l0.62 0.619h488.136c1.133 0.103 2.373 0.207 3.508 0.207 23.117 0 41.9-18.783 41.9-41.9a41.896 41.896 0 0 0-4.541-18.988C693.7 828.378 652.214 770.483 596.28 732.71c2.167-45.82 12.9-87.926 39.01-115.584 54.385-57.688 191.125-14.86 265.326-112.694 36.533-48.4 39.732-132.096 37.875-182.25z m-342.728 17.956c-29.103 0-52.736-23.633-52.736-52.838s23.634-52.839 52.736-52.839c29.102 0 52.735 23.633 52.735 52.839s-23.633 52.838-52.735 52.838z" p-id="12469"></path></svg></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show2[1]}>Breed</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show2[1]}>{this.state.profile.q2.breed1}, {this.state.profile.q2.breed2}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show3[0]}>
                        <div class="pet-overview-card__list-item-icon"><svg t="1605225897124" class={this.state.show3[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9955" width="200" height="200"><path d="M929.194951 28.444444H95.289173A95.431111 95.431111 0 0 0 0.000284 123.733333v776.533334A95.118222 95.118222 0 0 0 95.289173 995.555556h833.422223A95.118222 95.118222 0 0 0 1024.000284 900.266667V123.733333C1025.50784 71.480889 981.959396 28.444444 929.194951 28.444444zM513.25184 787.569778a95.118222 95.118222 0 0 1-95.288889-95.288889c0-11.264 2.56-22.016 5.632-31.772445l-139.320889-119.352888a31.772444 31.772444 0 0 1-3.072-45.084445 31.772444 31.772444 0 0 1 45.084445-3.072l137.784889 118.328889a93.212444 93.212444 0 0 1 49.692444-13.824c52.252444 0 94.776889 43.036444 95.288889 94.776889a96.199111 96.199111 0 0 1-95.800889 95.288889z m350.890667-157.752889a31.943111 31.943111 0 0 1-31.772445-31.772445c0-176.213333-142.904889-320.142222-320.142222-320.142222-176.213333 0-320.142222 142.904889-320.142222 320.142222 0 16.896-13.824 31.772444-31.772445 31.772445a31.943111 31.943111 0 0 1-31.772444-31.772445c0-212.053333 172.117333-384.682667 384.682667-384.682666 212.053333 0 384.682667 171.605333 382.634666 384.682666a31.516444 31.516444 0 0 1-31.715555 31.772445z" p-id="9956"></path></svg></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show3[1]}>Weight</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show3[1]}>{this.state.profile.q2.weight}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show4[0]}>
                        <div class="pet-overview-card__list-item-icon"><svg t="1605225997940" class={this.state.show4[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10694" width="200" height="200"><path d="M950.315344 531.324162L780.190476 274.150265c-2.167196-3.250794-5.05679-6.140388-7.946384-8.668784-3.973192-9.391182-11.919577-16.976367-22.394357-20.949559-20.22716-7.223986-42.260317 3.611993-49.123104 23.477955l-133.643739 379.620458-76.935449-252.478307c-6.140388-20.58836-27.812346-32.146737-48.039506-25.64515-3.250794 1.083598-6.501587 2.528395-9.029983 4.334392-10.11358 3.973192-18.421164 11.919577-22.394356 22.755555l-55.985891 154.593298-50.567901-87.410229c0-9.752381-3.973192-19.143563-11.197178-26.728748-15.17037-15.17037-39.370723-15.17037-54.541094 0l-163.62328 163.623281c-15.17037 15.17037-15.17037 39.370723 0 54.541093 15.17037 15.17037 39.370723 15.17037 54.541093 0l124.613757-124.613756 62.487478 107.998589c6.140388 10.835979 16.976367 17.337566 28.534744 18.782363 2.889594 2.167196 6.501587 4.334392 10.113581 5.417989 19.865961 7.223986 42.260317-3.250794 49.484303-23.116754l43.343915-119.918166 77.296649 253.923104c6.140388 20.58836 27.812346 32.146737 48.039506 25.64515 2.889594-0.722399 5.417989-2.167196 7.585186-3.250794 10.47478-3.611993 19.504762-11.919577 23.477954-23.477954l143.757319-408.516402 137.97813 208.411993c11.919577 17.698765 35.75873 22.755556 53.457496 10.835979 18.059965-10.47478 22.755556-34.313933 10.835979-52.012699z" p-id="10695"></path></svg></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show4[1]}>Activity Level</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show4[1]}>{this.state.profile.q2.activeLevel}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show5[0]}>
                        <div class="pet-overview-card__list-item-icon"><svg t="1605226276173" class={this.state.show5[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13214" width="200" height="200"><path d="M871.836 871.836c199.445-199.445 199.445-522.808 0-722.252s-522.808-199.445-722.252 0c-199.445 199.445-199.445 522.808 0 722.252s522.808 199.445 722.252 0z m-586.83-135.423c-24.93-24.93-24.572-65.709-0.208-90.073L646.34 284.798c24.816-24.816 64.969-24.897 90.074 0.208 24.93 24.93 24.572 65.71 0.208 90.074L375.08 736.622c-24.816 24.816-64.969 24.897-90.073-0.208z" p-id="13215"></path></svg></div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show5[1]}>Has Sensitivities</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show5[1]}>Value</div></div>
                      </div>
                    </div>
                  </div>
                </div>
        )
    }

}
const story = withRouter(Story);
export default story;