import React, { Component } from 'react';
import echarts  from 'echarts/dist/echarts.common';
import 'echarts/lib/component/tooltip';
import axios from 'axios';
import '../setting/axiosSetting';

let myChart;

export class DietDiagram extends React.Component {

    state = {
        cal: 0,
        protein: [22.5, 18],
        fat: [8.5, 5.5],
        index: 0,
    }


    getDogRatio(){
        axios.get("http://localhost:8081/mer/customer/get/dog/" + "23")
            .then(resJson => {
                console.log(resJson)
                let index = 0;
                if(resJson.data.agePeriodId >= 4 && (resJson.data.data.lifePhaseId == 3 || resJson.data.data.lifePhaseId == 5)){
                    index = 1;
                }
                this.setState({
                    cal: resJson.data.data.cal,
                    index: index,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidMount(){
        this.getDogRatio();
        myChart = echarts.init(document.getElementById('main'));
    }

  render() {
    var category = ['protein', 'fat'];
    var barData = [this.props.data.protein/this.state.protein[this.state.index], this.props.data.fat/this.state.fat[this.state.index]];

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: category,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: barData,
                barWidth: 14,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#3977E6'},
                                {offset: 1, color: '#37BBF8'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    if(myChart != undefined){
        myChart.setOption(option);
    }
    
    return (

                    <div style={{ height: '300px'}} id = "main" >
                        图表2
                    </div>
    )
  }
}
export default DietDiagram;