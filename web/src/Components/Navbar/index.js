import React, { Component } from 'react'
import './Navbar.css'
import {withRouter} from 'react-router-dom'
import Logo from '../Logo'  
import UserAvatar from '../UserAvatar'
import { Link } from 'react-router-dom'

export class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLinks: false,
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState({
                showLinks: false
            })
        });
    }
   
    componentDidUpdate() {
        if (!this.state.showLinks) {
            document.querySelector('.nav-list').classList.remove('active')
            document.querySelector('nav').classList.remove('glass')
        } else {
            document.querySelector('.nav-list').classList.add('active')
            document.querySelector('nav').classList.add('glass')
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleOnHamClick() {
        this.setState({
            showLinks: !this.state.showLinks
        })
    }

    render() {

        const {
            user, setUser,
            isLoggedIn, setIsLoggedIn
        } = this.props;

        return (
            <nav>
                <Logo />
                <div className="hamburger" 
                    onClick={() => {this.handleOnHamClick()}}
                >
                    <div className="line one"></div>
                    <div className="line two"></div>
                    <div className="line three"></div>
                </div>
                <ul className="nav-list">
                    <li><Link className="list-item" to="/">HOME</Link></li>
                    <li><Link className="list-item" to="/about">ABOUT</Link></li>
                    <li><Link className="list-item" to="/browse">BROWSE</Link></li>
                    {!isLoggedIn && 
                        <>
                            <li><Link className="list-item" to="/login">LOGIN</Link></li>
                            <li><Link className="list-item btn primary" to="/sign-up">SIGN UP</Link></li>
                        </>
                    }
                    {isLoggedIn && user &&
                        <li>
                            <UserAvatar 
                                user={user} 
                                setUser={setUser}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar)
