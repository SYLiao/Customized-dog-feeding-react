
import React from "react"
 
class OverLap extends React.Component {
	render() {
	  const {children,topDistance} = this.props
	  return (
		<div className="air_bubble" style={{top:topDistance+'px'}}>
		  {children}
		</div> 
	  )
	}
  }

export default OverLap;
