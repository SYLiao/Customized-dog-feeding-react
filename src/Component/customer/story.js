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
    name: localStorage.getItem("name"),
    progress: 5,
    age: "",
    breed: "",
    Weight: 0,
    activeLevel: "",
    sensitive: "",
    progressNumber: 0,
    show1: ["is-incomplete", "", "icon"],
    show2: ["is-incomplete", "", "icon"],
    show3: ["is-incomplete", "", "icon"],
    show4: ["is-incomplete", "", "icon"],
    show5: ["is-incomplete", "", "icon"],
		profile:JSON.parse(localStorage.getItem("profile")),
	}

	componentDidMount(){
    if(this.state.profile == null){
			let newProfile = {
				q1:{
					name:"",
					email: "",
				},
				q2:{
					name:"",
					gender:"",
					age:"",
					spay: false,
					breed1:"",
					breed2:"",
					bodyType:0,
					weight:0,
					activeLevel:"",
				},
				q3:{
					FrequentlyChewsPaws: false,
					LooseStool: false,
					HotSpots: false,
					Vomiting: false,
					FrequentSkinInfections: false,
					ExcessiveGas: false,
					progressNumber: 2,
					Grains: false,
					Eggs: false,
					Chicken: false,
					Gluten: false,
					RedMeat: false,
					Flax: false,
					Potatoes: false,
					None: false,
				},
				q4:{
					choose:0,
					costomize:{

					},
					recommand:{

					},
				},
			};
			this.setState({
				profile : newProfile
			});
			localStorage.setItem("profile", JSON.stringify(newProfile));
    }
    switch(this.state.progress) {
      case 1:
        this.setState({
          breed: this.state.profile.q2.breed,
          show1: ["", "label-color", "icon-story"],
        })
        break;
      case 2:
        this.setState({
          breed: this.state.profile.q2.breed,
          age: this.state.profile.q2.age,
          show1: ["", "label-color", "icon-story"],
          show2: ["", "label-color", "icon-story"],
        })
        break;
        case 3:
          this.setState({
            breed: this.state.profile.q2.breed,
            age: this.state.profile.q2.age,
            weight: this.state.profile.q2.weight,
            show1: ["", "label-color", "icon-story"],
            show2: ["", "label-color", "icon-story"],
            show3: ["", "label-color", "icon-story"],
          })
          break;
          case 4:
            this.setState({
              breed: this.state.profile.q2.breed,
              age: this.state.profile.q2.age,
              weight: this.state.profile.q2.weight,
              activeLevel: this.state.profile.q2.activeLevel,
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

    render(){
        return(
              <div class="pz-slide__pet-overview-card pz-pet-overview-card pet-overview-card offset-lg-1 d-none d-lg-block">
                  <div class="pet-overview-card__header text-center text-uppercase bg-sun">
                    <div class="pet-overview-card__eyebrow">
                      <div class="badge--tailored">
                      <svg t="1605430066761" class="dognameicon" viewBox="0 0 1121 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11445" width="200" height="200"><path d="M1028.864608 690.774347l-68.104513-158.099763-65.672209-72.969121-36.484561-19.458432-7.296912-12.16152-94.859857-17.026129-126.47981 2.432304-128.912114-12.16152-19.458432-12.16152-2.432305-2.432304-51.078384-31.619952-9.729216-7.296913-19.458433-14.593824L340.522565 238.365796l-72.969121-58.375297h-4.864608l-12.16152-2.432304-19.458432-43.781473-17.026129-4.864608s-7.296912 9.729216-7.296912 12.16152v36.484561l-24.32304 9.729216-34.052257 24.32304-4.864608 7.296912-9.729216 21.890737-60.807601 12.16152h-4.864608l-4.864608 14.593824 2.432304 9.729216 7.296912 26.755345 19.458432 12.16152 63.239905 14.593824 21.890737 14.593824 2.432304 14.593825 4.864608 43.781472 7.296912 24.323041 9.729216 34.052256 24.323041 46.213777 19.458432 63.239905 36.48456 53.510689c7.296912 36.484561 19.458432 102.15677 19.458433 102.156769l14.593824 89.99525-19.458432 46.213776-31.619953 7.296913-9.729216 26.755344 36.484561 2.432304h-7.296913l-2.432304 21.890736 17.026129 4.864608 36.48456-2.432304h14.593824l14.593825-41.349168 17.026128-43.781473 4.864608-77.833729 14.593824-77.833729h7.296912l38.916865 2.432304 102.15677-9.729216 126.47981-21.890737 34.052256-9.729216 12.16152-2.432304 29.187649 60.807601 31.619952 36.484561 26.755345 31.619952 2.432304 36.484561-12.16152 60.807601-14.593825 7.296912-9.729216 4.864608 2.432304 19.458432 48.646081 2.432304h14.593824l4.864608-36.48456 17.026128-87.562946 17.026129 17.026128-2.432304 38.916865-12.16152 46.213777-2.432305 4.864608-21.890736 14.593824-4.864608 2.432304 7.296912 21.890736h26.755345l38.916864-2.432304 29.187649-141.073634v-14.593824l-14.593825-19.458432-7.296912-17.026129-7.296912-19.458432-2.432304-26.755344 4.864608-34.052257 12.16152 31.619953 29.187649 82.698337 51.078385 65.672209 43.781472 19.458432s4.864608-26.755344 4.864608-31.619952v-53.510689-4.864608l-24.32304-68.104513z" fill="#68b0ab" p-id="11446"></path>
                      </svg>                        
                      </div>
                    </div>
                    <h2 class="pet-overview-card__title font-ginto-nord-black">Mookey</h2></div>
                  <div class="pet-overview-card__body">
                    <div class="pet-overview-card__list">
                      <div class={"pet-overview-card__list-item " + this.state.show1[0]}>
                        <div class="pet-overview-card__list-item-icon">
                          <svg t="1605431874427" class={this.state.show1[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="102163" width="200" height="200"><path d="M667.2 1024H364.8C203.2 1024 70.4 891.2 70.4 729.6l-4.8-414.4c0-60.8 49.6-110.4 110.4-110.4h670.4c60.8 0 110.4 49.6 110.4 110.4l6.4 414.4C961.6 891.2 828.8 1024 667.2 1024z" fill="#D7CCC8" p-id="102164"></path><path d="M196.8 667.2m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102165"></path><path d="M252.8 729.6m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102166"></path><path d="M308.8 667.2m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102167"></path><path d="M692.8 667.2m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102168"></path><path d="M748.8 729.6m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102169"></path><path d="M804.8 667.2m-14.4 0a14.4 14.4 0 1 0 28.8 0 14.4 14.4 0 1 0-28.8 0Z" fill="#805F4C" p-id="102170"></path><path d="M740.8 801.6l-41.6-70.4c-25.6-44.8-83.2-60.8-128-33.6l-32 19.2c-11.2 6.4-20.8 16-28.8 25.6-8-9.6-17.6-19.2-28.8-25.6l-32-19.2c-44.8-25.6-102.4-11.2-128 33.6l-41.6 70.4c-25.6 44.8-11.2 102.4 33.6 128l32 19.2c44.8 25.6 102.4 11.2 128-33.6l35.2-62.4 35.2 62.4c25.6 44.8 83.2 60.8 128 33.6l32-19.2c46.4-25.6 62.4-83.2 36.8-128z" fill="#A3897A" p-id="102171"></path><path d="M166.4 134.4C57.6 134.4 0 227.2 0 419.2s196.8 152 196.8-36.8 108.8-172.8 108.8-172.8-30.4-75.2-139.2-75.2zM857.6 134.4c-108.8 0-140.8 75.2-140.8 75.2s108.8-17.6 108.8 172.8S1024 611.2 1024 419.2 966.4 134.4 857.6 134.4zM592 652.8l-20.8-6.4c-40-11.2-83.2-11.2-121.6 0l-19.2 6.4c-9.6 3.2-16 9.6-16 17.6v28.8c0 6.4 6.4 11.2 14.4 11.2s14.4 4.8 14.4 11.2c0 11.2 11.2 20.8 25.6 20.8h83.2c14.4 0 25.6-9.6 25.6-20.8 0-6.4 6.4-11.2 14.4-11.2s14.4-4.8 14.4-11.2v-28.8c1.6-8-4.8-14.4-14.4-17.6z" fill="#212121" p-id="102172"></path><path d="M414.4 571.2c-12.8 0-22.4-8-22.4-19.2 0-4.8 3.2-9.6 6.4-12.8-4.8-3.2-11.2-6.4-17.6-6.4-19.2 0-36.8 17.6-36.8 40s16 40 36.8 40c19.2 0 36.8-17.6 36.8-40v-3.2c-1.6 1.6-3.2 1.6-3.2 1.6zM688 569.6h-1.6c-12.8 0-22.4-8-22.4-19.2 0-4.8 3.2-9.6 6.4-12.8-4.8-3.2-11.2-6.4-17.6-6.4-19.2 0-36.8 17.6-36.8 40s16 40 36.8 40c19.2 0 36.8-17.6 36.8-40-1.6 1.6-1.6 0-1.6-1.6z" fill="#212121" p-id="102173"></path></svg>
                        </div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show1[1]}>Breed</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show1[1]}>{this.state.breed}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show2[0]}>
                        <div class="pet-overview-card__list-item-icon">
                          <svg t="1605430500518" class={this.state.show2[2]} viewBox="0 0 1051 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26660" width="200" height="200"><path d="M83.027027 664.216216h885.621622v276.756757H83.027027z" fill="#FF5722" p-id="26661"></path><path d="M1051.675676 913.297297H0a110.702703 110.702703 0 0 0 110.702703 110.702703h830.27027a110.702703 110.702703 0 0 0 110.702703-110.702703z" fill="#BF360C" p-id="26662"></path><path d="M885.621622 498.162162H166.054054a110.702703 110.702703 0 0 0-110.702703 110.702703v22.444973a54.299676 54.299676 0 0 0 37.223784 52.583784A110.702703 110.702703 0 0 0 193.72973 664.216216a155.537297 155.537297 0 0 0 110.702702 41.513514 155.537297 155.537297 0 0 0 110.702703-41.513514 138.378378 138.378378 0 0 0 221.405406 0 146.847135 146.847135 0 0 0 110.702702 41.513514 146.847135 146.847135 0 0 0 110.702703-41.513514 110.702703 110.702703 0 0 0 101.154595 19.566703A54.299676 54.299676 0 0 0 996.324324 631.309838V608.864865a110.702703 110.702703 0 0 0-110.702702-110.702703z" fill="#FFAB91" p-id="26663"></path><path d="M442.810811 304.432432h166.054054v193.72973h-166.054054z" fill="#00BCD4" p-id="26664"></path><path d="M608.864865 332.108108h-166.054054a27.675676 27.675676 0 0 1-27.675676-27.675676 27.675676 27.675676 0 0 1 27.675676-27.675675h166.054054a27.675676 27.675676 0 0 1 27.675676 27.675675 27.675676 27.675676 0 0 1-27.675676 27.675676z" fill="#00BCD4" p-id="26665"></path><path d="M608.864865 166.054054a83.027027 83.027027 0 0 1-166.054054 0c0-45.858595 83.027027-166.054054 83.027027-166.054054s83.027027 120.195459 83.027027 166.054054z" fill="#FF9800" p-id="26666"></path><path d="M567.351351 207.567568a41.513514 41.513514 0 0 1-83.027027 0c0-22.915459 41.513514-83.027027 41.513514-83.027027s41.513514 60.111568 41.513513 83.027027z" fill="#FFE0B2" p-id="26667"></path></svg>
                        </div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show2[1]}>Age</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show2[1]}>{this.state.age}</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show3[0]}>
                        <div class="pet-overview-card__list-item-icon">
                          <svg t="1605430757224" class={this.state.show3[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37737" width="200" height="200"><path d="M762.5216 384.3072H237.0048a49.2032 49.2032 0 0 0-48.9472 44.288l-41.3696 413.44c-2.9184 28.928 19.8144 54.0672 48.9472 54.0672h612.352c29.2864 0 52.0704-25.4464 48.896-54.5792l-45.5168-413.44c-2.7136-24.8832-23.808-43.776-48.8448-43.776z" fill="#FC483A" p-id="37738"></path><path d="M307.968 332.0832h389.2224v52.224H307.968z" fill="#E82121" p-id="37739"></path><path d="M768.9216 332.0832H253.5424c-86.6816 0-197.888-70.2464-197.888-156.928h911.1552c0 86.6816-111.2064 156.928-197.888 156.928z" fill="#82E7F4" p-id="37740"></path><path fill="#E82121" p-id="37741" d="M517.3248 640.2048m-175.2576 0a175.2576 175.2576 0 1 0 350.5152 0 175.2576 175.2576 0 1 0-350.5152 0Z"></path><path fill="#DCFDFF" p-id="37742" d="M502.4256 627.8656m-175.2576 0a175.2576 175.2576 0 1 0 350.5152 0 175.2576 175.2576 0 1 0-350.5152 0Z"></path><path fill="#8080F9" p-id="37747" d="M524.8512 563.7632c6.7584 0 10.1376-8.1408 5.3248-12.9024l-21.8112-21.8112c-2.9184-2.9184-7.5776-2.9696-10.5472-0.1536l-22.9888 21.8112c-4.9664 4.7104-1.6384 13.056 5.2224 13.056h7.5264v43.008a25.86624 25.86624 0 0 0-11.008 21.0944c0 14.2848 11.5712 25.856 25.856 25.856s25.856-11.5712 25.856-25.856c0-8.7552-4.352-16.4352-11.008-21.0944v-43.008h7.5776z"></path><path fill="#DCFDFF" p-id="37748"></path><path d="M760.4224 296.7552H227.584s-138.3936-1.3312-170.7008-105.984c12.1856 79.36 115.2512 141.312 196.6592 141.312h515.3792c86.6816 0 197.888-70.2464 197.888-156.928h-60.1088s-42.8544 121.6-146.2784 121.6z" fill="#61D7E0" p-id="37749"></path><path d="M307.968 332.0832h389.2224v52.224h-48.5376v-35.2768l-340.6848-11.776z" fill="#CE1515" p-id="37750"></path><path d="M690.9952 896.1024h116.992c29.2864 0 52.0704-25.4464 48.896-54.5792l-45.5168-413.44a49.17248 49.17248 0 0 0-48.896-43.776h-36.1984s39.2192 8.7552 48.384 56.0128c9.1648 47.2576 40.5504 387.1232 40.5504 387.1232s18.2784 68.6592-124.2112 68.6592z" fill="#E82121" p-id="37751"></path><path d="M524.4928 418.4064c0-4.9664-3.9936-8.96-8.96-8.96H264.3456s-41.1648-4.3008-48.384 50.9952c-6.2976 48.2816-25.856 257.6896-30.72 310.0672-0.6144 6.6048 4.1984 12.4416 10.8032 13.1584 6.0928 0.6656 11.7248-3.328 13.1584-9.2672l68.2496-288.256a39.68 39.68 0 0 1 32.768-29.44l206.592-29.44c4.4032-0.6144 7.68-4.4032 7.68-8.8576z" fill="#F9716E" p-id="37752"></path></svg>
                        </div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show3[1]}>Weight</div>
                          <div class={"pet-overview-card__list-item-value " + this.state.show3[1]}>Value</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show4[0]}>
                        <div class="pet-overview-card__list-item-icon">
                        <svg t="1605431478498" class={this.state.show4[2]} viewBox="0 0 1194 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="76043" width="200" height="200"><path d="M1151.488 675.2256l-4.5056-5.3248a92.16 92.16 0 0 0-144.2816 0L953.5488 727.04l-45.4656-53.0432a94.8224 94.8224 0 0 0-148.7872 0 137.9328 137.9328 0 0 0 0 174.08l119.9104 139.9808a96.5632 96.5632 0 0 0 84.7872 35.328 94.4128 94.4128 0 0 0 55.9104-26.7264c2.7648-2.7648 5.5296-5.5296 8.0896-8.6016 0.512 0 0.8192-1.1264 1.2288-1.536l122.2656-143.36a133.632 133.632 0 0 0 0-167.936z" fill="#FFC646" p-id="76044"></path><path d="M1113.3952 95.0272c-108.544-126.6688-286.1056-126.6688-394.6496 0L601.8048 231.5264a8.2944 8.2944 0 0 1-12.9024 0l-99.7376-116.4288C349.2864-48.2304 93.2864-2.048 20.6848 205.7216c-40.96 117.4528-20.48 257.4336 60.8256 352.768L364.4416 888.832a454.144 454.144 0 0 0 112.64 96.6656c46.8992 27.7504 94.72 42.8032 146.2272 36.9664a249.6512 249.6512 0 0 0 147.7632-70.8608 305.8688 305.8688 0 0 0 21.7088-22.7328c1.1264-1.3312 2.048-2.7648 3.1744-4.096l317.44-371.2c108.4416-126.1568 108.4416-332.3904 0-458.5472z" fill="#FF1F1F" opacity=".7" p-id="76045"></path><path d="M472.064 653.4144a30.72 30.72 0 0 1-26.2144-14.7456l-133.12-219.4432-104.6528 88.1664A30.72 30.72 0 0 1 168.0384 460.8l132.1984-111.7184a30.72 30.72 0 0 1 46.08 7.5776l122.88 201.8304 102.4-212.0704a30.72 30.72 0 0 1 54.5792-1.4336l93.9008 171.4176h234.8032a30.72 30.72 0 0 1 0 61.44h-252.928a30.72 30.72 0 0 1-26.9312-15.872l-74.24-135.168-101.0688 209.2032a30.72 30.72 0 0 1-26.112 17.408z" fill="#FFFFFF" p-id="76046"></path></svg>
                        </div>
                        <div class="pet-overview-card__list-item-text ml-4">
                          <div class={"pet-overview-card__list-item-label " + this.state.show4[1]}>Activity Level</div>
                        <div class={"pet-overview-card__list-item-value " + this.state.show4[1]}>Value</div></div>
                      </div>
                      <div class={"pet-overview-card__list-item " + this.state.show5[0]}>
                        <div class="pet-overview-card__list-item-icon">
                          <svg t="1605431025201" class={this.state.show5[2]} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="59853" width="200" height="200"><path d="M805.319662 27.17579s117.788798 356.935752 117.788798 595.677098V908.563733l-255.290185 115.192902-43.967995-325.379387 102.537907-490.786659z" fill="#b8784f" p-id="59854"></path><path d="M804.102835 29.690565s-33.665531 84.447754-65.708627 244.01426c0 0 163.541472 315.725897 183.091817 348.09348a329.273231 329.273231 0 0 0-1.297949-51.187832c-1.622435-16.224352-5.029549-200.938604-116.085241-540.919908z" fill="#a5724d" p-id="59855"></path><path d="M202.99058 0S100.696038 414.36996 100.696038 545.543849s10.464707 343.388418 10.464707 343.388417l556.65753 134.824369a3190.032164 3190.032164 0 0 1 2.109166-379.406481c13.7907-218.379783 121.195912-575.315535 132.390715-614.25398a25.228868 25.228868 0 0 0 2.27141-1.865801 10.626951 10.626951 0 0 0 0-1.135705z" fill="#fce9db" p-id="59856"></path><path d="M106.78017 470.506219l573.855344 73.983047c6.327497-44.21136 14.683039-91.099739 24.336528-137.906996L129.737629 332.599224C120.246383 382.083498 112.053085 429.945338 106.78017 470.506219z" fill="#e7a473" p-id="59857"></path><path d="M664.654527 760.759883a761.895587 761.895587 0 0 0-67.087698-76.254456s-44.616969 23.03858-25.309989 110.487839l-4.867306 2.028044a606.304048 606.304048 0 0 0-91.424226 43.562386 602.978056 602.978056 0 0 0-85.907945 53.540363l-4.380576 3.001505c-63.274974-63.356096-106.675117-38.20835-106.675116-38.208349s11.03256 32.448705 29.366077 77.714647L660.436195 1022.134199l7.625446 1.865801c-0.648974-1.460192-7.625446-112.191397-3.407114-263.240117z" fill="#fce9db" p-id="59858"></path><path d="M612.817721 901.749505m-13.222848 0a13.222847 13.222847 0 1 0 26.445695 0 13.222847 13.222847 0 1 0-26.445695 0Z" fill="#fce9db" p-id="59859"></path><path d="M390.706337 210.916581l113.083736 11.194803a39.993029 39.993029 0 0 0 43.237899-32.448705L580.693503 17.03557 383.892109 8.112176l-28.635982 155.348174A40.560881 40.560881 0 0 0 390.706337 210.916581z" fill="#e7a473" p-id="59860"></path></svg>
                          </div>
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