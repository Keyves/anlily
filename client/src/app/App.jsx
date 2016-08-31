import React, { PropTypes } from 'react'
import { connect }	from 'react-redux'
import * as homeActions from 'app/redux/actions/home'

@connect(state => state)
export default class App extends React.Component {
	static propTypes = {
		children: PropTypes.object,
		homeState: PropTypes.object.isRequired,
		dispatch: PropTypes.func
	}

    render() {
		const { homeState, dispatch } = this.props

		const text = homeState.get('text')

        return (
            <div>
                <input value={text} onChange={(e) => dispatch(homeActions.changeText(e.target.value))}/>
				<span>{text}</span>
            </div>
        )
    }
}
