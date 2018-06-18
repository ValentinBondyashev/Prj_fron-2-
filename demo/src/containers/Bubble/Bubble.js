import React, { Component } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import flare from '../../components/ZoomableLayout/flare.json'
import { connect } from 'react-redux'
import { getSkillsAction } from '../../actions/skill'

const data = {
    "name": "nivo",
    "color": "hsl(259, 70%, 50%)",
    "children": [
      {
        "name": "viz",
        "color": "hsl(342, 70%, 50%)",
        "children": [
          {
            "name": "stack",
            "color": "hsl(111, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(353, 70%, 50%)",
                "loc": 56269
              },
              {
                "name": "xAxis",
                "color": "hsl(257, 70%, 50%)",
                "loc": 135562
              },
              {
                "name": "yAxis",
                "color": "hsl(140, 70%, 50%)",
                "loc": 43046
              },
              {
                "name": "layers",
                "color": "hsl(17, 70%, 50%)",
                "loc": 78472
              }
            ]
          },
          {
            "name": "pie",
            "color": "hsl(281, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(222, 70%, 50%)",
                "children": [
                  {
                    "name": "pie",
                    "color": "hsl(138, 70%, 50%)",
                    "children": [
                      {
                        "name": "outline",
                        "color": "hsl(137, 70%, 50%)",
                        "loc": 16199
                      },
                      {
                        "name": "slices",
                        "color": "hsl(165, 70%, 50%)",
                        "loc": 90429
                      },
                      {
                        "name": "bbox",
                        "color": "hsl(21, 70%, 50%)",
                        "loc": 160040
                      }
                    ]
                  },
                  {
                    "name": "donut",
                    "color": "hsl(9, 70%, 50%)",
                    "loc": 58463
                  },
                  {
                    "name": "gauge",
                    "color": "hsl(316, 70%, 50%)",
                    "loc": 107994
                  }
                ]
              },
              {
                "name": "legends",
                "color": "hsl(75, 70%, 50%)",
                "loc": 117050
              }
            ]
          }
        ]
      },
      {
        "name": "colors",
        "color": "hsl(31, 70%, 50%)",
        "children": [
          {
            "name": "rgb",
            "color": "hsl(233, 70%, 50%)",
            "loc": 167996
          },
          {
            "name": "hsl",
            "color": "hsl(170, 70%, 50%)",
            "loc": 124451
          }
        ]
      },
      {
        "name": "utils",
        "color": "hsl(128, 70%, 50%)",
        "children": [
          {
            "name": "randomize",
            "color": "hsl(262, 70%, 50%)",
            "loc": 37944
          },
          {
            "name": "resetClock",
            "color": "hsl(104, 70%, 50%)",
            "loc": 188857
          },
          {
            "name": "noop",
            "color": "hsl(153, 70%, 50%)",
            "loc": 144133
          },
          {
            "name": "tick",
            "color": "hsl(141, 70%, 50%)",
            "loc": 100266
          },
          {
            "name": "forceGC",
            "color": "hsl(329, 70%, 50%)",
            "loc": 77171
          },
          {
            "name": "stackTrace",
            "color": "hsl(56, 70%, 50%)",
            "loc": 70590
          },
          {
            "name": "dbg",
            "color": "hsl(192, 70%, 50%)",
            "loc": 50553
          }
        ]
      },
      {
        "name": "generators",
        "color": "hsl(241, 70%, 50%)",
        "children": [
          {
            "name": "address",
            "color": "hsl(107, 70%, 50%)",
            "loc": 91628
          },
          {
            "name": "city",
            "color": "hsl(188, 70%, 50%)",
            "loc": 58215
          },
          {
            "name": "animal",
            "color": "hsl(136, 70%, 50%)",
            "loc": 88860
          },
          {
            "name": "movie",
            "color": "hsl(13, 70%, 50%)",
            "loc": 89427
          },
          {
            "name": "user",
            "color": "hsl(123, 70%, 50%)",
            "loc": 28527
          }
        ]
      },
      {
        "name": "set",
        "color": "hsl(152, 70%, 50%)",
        "children": [
          {
            "name": "clone",
            "color": "hsl(179, 70%, 50%)",
            "loc": 12155
          },
          {
            "name": "intersect",
            "color": "hsl(216, 70%, 50%)",
            "loc": 64621
          },
          {
            "name": "merge",
            "color": "hsl(294, 70%, 50%)",
            "loc": 175969
          },
          {
            "name": "reverse",
            "color": "hsl(10, 70%, 50%)",
            "loc": 54641
          },
          {
            "name": "toArray",
            "color": "hsl(329, 70%, 50%)",
            "loc": 52958
          },
          {
            "name": "toObject",
            "color": "hsl(26, 70%, 50%)",
            "loc": 193387
          },
          {
            "name": "fromCSV",
            "color": "hsl(21, 70%, 50%)",
            "loc": 13348
          },
          {
            "name": "slice",
            "color": "hsl(356, 70%, 50%)",
            "loc": 121212
          },
          {
            "name": "append",
            "color": "hsl(335, 70%, 50%)",
            "loc": 46075
          },
          {
            "name": "prepend",
            "color": "hsl(247, 70%, 50%)",
            "loc": 122262
          },
          {
            "name": "shuffle",
            "color": "hsl(317, 70%, 50%)",
            "loc": 58088
          },
          {
            "name": "pick",
            "color": "hsl(313, 70%, 50%)",
            "loc": 74224
          },
          {
            "name": "plouc",
            "color": "hsl(320, 70%, 50%)",
            "loc": 86520
          }
        ]
      },
      {
        "name": "text",
        "color": "hsl(356, 70%, 50%)",
        "children": [
          {
            "name": "trim",
            "color": "hsl(48, 70%, 50%)",
            "loc": 72402
          },
          {
            "name": "slugify",
            "color": "hsl(354, 70%, 50%)",
            "loc": 157709
          },
          {
            "name": "snakeCase",
            "color": "hsl(244, 70%, 50%)",
            "loc": 157430
          },
          {
            "name": "camelCase",
            "color": "hsl(257, 70%, 50%)",
            "loc": 32591
          },
          {
            "name": "repeat",
            "color": "hsl(300, 70%, 50%)",
            "loc": 40087
          },
          {
            "name": "padLeft",
            "color": "hsl(266, 70%, 50%)",
            "loc": 6015
          },
          {
            "name": "padRight",
            "color": "hsl(25, 70%, 50%)",
            "loc": 32154
          },
          {
            "name": "sanitize",
            "color": "hsl(37, 70%, 50%)",
            "loc": 185536
          },
          {
            "name": "ploucify",
            "color": "hsl(251, 70%, 50%)",
            "loc": 52124
          }
        ]
      },
      {
        "name": "misc",
        "color": "hsl(244, 70%, 50%)",
        "children": [
          {
            "name": "whatever",
            "color": "hsl(184, 70%, 50%)",
            "children": [
              {
                "name": "hey",
                "color": "hsl(168, 70%, 50%)",
                "loc": 165869
              },
              {
                "name": "WTF",
                "color": "hsl(257, 70%, 50%)",
                "loc": 114466
              },
              {
                "name": "lol",
                "color": "hsl(73, 70%, 50%)",
                "loc": 53389
              },
              {
                "name": "IMHO",
                "color": "hsl(140, 70%, 50%)",
                "loc": 101495
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(183, 70%, 50%)",
            "loc": 18324
          },
          {
            "name": "crap",
            "color": "hsl(11, 70%, 50%)",
            "children": [
              {
                "name": "crapA",
                "color": "hsl(156, 70%, 50%)",
                "loc": 97824
              },
              {
                "name": "crapB",
                "color": "hsl(192, 70%, 50%)",
                "children": [
                  {
                    "name": "crapB1",
                    "color": "hsl(38, 70%, 50%)",
                    "loc": 106014
                  },
                  {
                    "name": "crapB2",
                    "color": "hsl(210, 70%, 50%)",
                    "loc": 32935
                  },
                  {
                    "name": "crapB3",
                    "color": "hsl(175, 70%, 50%)",
                    "loc": 9254
                  },
                  {
                    "name": "crapB4",
                    "color": "hsl(190, 70%, 50%)",
                    "loc": 178796
                  }
                ]
              },
              {
                "name": "crapC",
                "color": "hsl(136, 70%, 50%)",
                "children": [
                  {
                    "name": "crapC1",
                    "color": "hsl(19, 70%, 50%)",
                    "loc": 57162
                  },
                  {
                    "name": "crapC2",
                    "color": "hsl(153, 70%, 50%)",
                    "loc": 178986
                  },
                  {
                    "name": "crapC3",
                    "color": "hsl(117, 70%, 50%)",
                    "loc": 158646
                  },
                  {
                    "name": "crapC4",
                    "color": "hsl(195, 70%, 50%)",
                    "loc": 115627
                  },
                  {
                    "name": "crapC5",
                    "color": "hsl(294, 70%, 50%)",
                    "loc": 159946
                  },
                  {
                    "name": "crapC6",
                    "color": "hsl(151, 70%, 50%)",
                    "loc": 96757
                  },
                  {
                    "name": "crapC7",
                    "color": "hsl(52, 70%, 50%)",
                    "loc": 84930
                  },
                  {
                    "name": "crapC8",
                    "color": "hsl(12, 70%, 50%)",
                    "loc": 38086
                  },
                  {
                    "name": "crapC9",
                    "color": "hsl(281, 70%, 50%)",
                    "loc": 191929
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

class Bubble extends Component {
    createNewArr = (skills) => {
   
        let other = {}, letter; 
        let obj = {
            "name": "nivo",
            "children": []}
          skills.forEach(element => {
            letter = element.skillCategoryTitle;
               if (!(letter in other))
                   other[letter] = []; 
    
               other[letter].push(element);
          });
           var num = -1;
          for(let key in other) {
            obj.children.push({
              "name": key,
              "children": []
            })
              num++;
            for( var secondKey in other[key]){
              obj.children[num].children.push(
                {"name" :other[key][secondKey].skillTitle, "loc" : other[key][secondKey].mark }
             )}
           }
           return obj;
      }

    render(){
       
        return (
            <div style={{padding: '0', height: '1000px'}}>   
                   <ResponsiveBubble
        root={ this.createNewArr(this.props.skills)}
        margin={{
            "top": 23,
            "right": 20,
            "bottom": 20,
            "left": 20
        }}
        identity="name"
        value="loc"
        colors="nivo"
        colorBy="name"
        padding={6}
        label="id"
        labelSkipRadius={19}
        onClick={function(e){console.log(e)}}
        labelTextColor="inherit:darker(0.8)"
        borderWidth={3}
        defs={[
            {
                "id": "lines",
                "type": "patternLines",
                "background": "none",
                "color": "inherit",
                "rotation": -45,
                "lineWidth": 5,
                "spacing": 8
            }
        ]}
        fill={[
            {
                "match": {
                    "depth": 1
                },
                "id": "lines"
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
    />
            </div>
               
        )
    }
}

function mapStateToProps(state) {
    return { 
        skills: state.skill.skills.data,
    };
  }
  function mapDispathToProps(dispatch) {
    return {
        getSkillsFunction: function () {
            dispatch(getSkillsAction());
        }
    };
  }
  
  export default connect(mapStateToProps,mapDispathToProps)(Bubble);