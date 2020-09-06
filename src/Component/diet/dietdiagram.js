import React, { Component } from 'react';
import echarts  from 'echarts/dist/echarts.common';
import 'echarts/lib/component/tooltip';

export class DietDiagram extends React.Component {

    componentDidMount(){
        var placeHolderStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                color: 'rgba(0,0,0,0)',
                borderWidth: 0
            },
             // 鼠标经过时的高亮的扇区和标签样式。
            emphasis: {     
                color: 'pink',
                borderWidth: 0
            }
        };

        var dataStyle = {
            normal: {
                formatter: '{c}%',
                position: 'center',
                show: true,
                textStyle: {
                    fontSize: '28',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            }
        };

        var myChart = echarts.init(document.getElementById('main1'));
        myChart.setOption({
            backgroundColor: '#142058', // main1的背景颜色
            title: [
                {
                    text: '民众言论倾向性分析',
                    x: '40%',
                    y: '20',
                    textStyle: {
                        color: '#fff',
                        fontSize: 20
                    }
                }, {
                    text: '正面评论',
                    left: '29.8%',
                    top: '60%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16',
                        color: '#fff',
                        textAlign: 'center'
                    }
                }, {
                    text: '负面评论',
                    left: '70%',
                    top: '60%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal',
                        fontSize: '16',
                        textAlign: 'center'
                    }
                }],
            series: [{
            // 宽圆环的样式
                // 第一个宽圆环的样式
                type: 'pie',
                hoverAnimation: false,  // 鼠标经过的特效
                radius: ['25%', '31%'], //  '25%'内环的位置  '31%'外环的位置
                center: ['30%', '50%'], // 第一个值水平位置，第二个值调整垂直位置   
                startAngle: 225,        //  扇形的范围:[0,360]
                labelLine: {            // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
                    normal: {
                        show: false
                    }
                },
                label: {                   // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 75,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,    // 0% 处的颜色    
                                color: '#99da69'
                            }, {
                                offset: 1,    // 100% 处的颜色  
                                color: '#01babc'
                            }])
                        }
                    },
                    label: dataStyle          // 中间标签样式
                }, {
                    value: 25,
                    itemStyle: placeHolderStyle
                }

                ]
            },
            {   // 第二个宽圆环的样式
                type: 'pie',
                hoverAnimation: false,
                radius: ['25%', '31%'],
                center: ['70%', '50%'],
                startAngle: 225,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 20,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#9f3edd'
                            }, {
                                offset: 1,
                                color: '#4897f6'
                            }])
                        }
                    },
                    label: dataStyle
                }, {
                    value: 80,
                    itemStyle: placeHolderStyle
                }

                ]
            },
 
            // 外圈的（细）边框
            {  
                // 第一个外圈
                type: 'pie',
                hoverAnimation: false, // 鼠标经过的特效
                radius: ['31%', '32%'], // 外圈的大小
                center: ['30%', '50%'],
                startAngle: 225,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 75,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#01babc'
                            }, {
                                offset: 1,
                                color: '#99da69'
                            }])
                        }
                    }
                }, {
                    value: 25,
                    itemStyle: placeHolderStyle
                }

                ]
            },
             // 第二个外圈
            {   
                type: 'pie',
                hoverAnimation: false,
                radius: ['31%', '32%'],
                center: ['70%', '50%'],
                startAngle: 225,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{   // 窄边，紫色弧形
                    value: 75,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#4897f6'
                            }, {
                                offset: 1,
                                color: '#9f3edd'
                            }])
                        }
                    }
                }, {      //  窄边，透明弧形
                    value: 25,
                    itemStyle: placeHolderStyle
                }

                ]
            }
            ]
        });
    }

  render() {
    return (
        <body id="page-top">

            <div class="container-fluid">

            <h1 class="h3 mb-2 text-gray-800">Charts</h1>
            <p class="mb-4">Chart.js is a third party plugin that is used to generate the charts in this theme. The charts below have been customized - for further customization options, please visit the <a target="_blank" href="https://www.chartjs.org/docs/latest/">official Chart.js documentation</a>.</p>

            <div class="row">

                <div class="col-xl-8 col-lg-7">

                </div>

                <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">

                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Donut Chart</h6>

                    <div class="card-body">
                    <div class="chart-pie pt-4">
                    <div style={{ backgroundColor: '#ccc', height: '500px', marginBottom: '200px'}} id = "main1" >
                        图表2
                    </div>
                    </div>
                    <hr></hr>
                    Styling for the donut chart can be found in the <code>/js/demo/chart-pie-demo.js</code> file.
                    </div>
                </div>
                </div>
            </div>

            </div>


        </div>

    <script src="../../vendor/jquery/jquery.min.js"></script>
    <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>

    <script src="../../js/sb-admin-2.min.js"></script>

    <script src="../../vendor/chart.js/Chart.min.js"></script>

    <script src="../../js/demo/chart-area-demo.js"></script>
    <script src="../../js/demo/chart-pie-demo.js"></script>
    <script src="../../js/demo/chart-bar-demo.js"></script>

    </body>
    )
  }
}
export default DietDiagram;