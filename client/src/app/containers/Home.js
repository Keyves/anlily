import React from 'react'
import AnliLink from './components/AnliLink'
import Etong from './Etong'
import './styles/home.scss'

var imageDatas = require('./data/anli.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('./images/home/anli/' + singleImageData.filename);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
}
imageDatas = genImageURL(imageDatas);



class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          cname: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            cname: !this.state.cname
        });
    }
  render() {
      const text = this.state.cname? 'down' : 'up' ;
    return(
        <div className="home-hidden-scroll">
            <div className="wrapper home-container">
                <span onClick={this.handleClick} className={text}><span className="arrow"></span></span>
                {/*内容开始*/}
                <div className="home-part">
                    <div className="home-part-one">
                        <div className="home-circle ">
                            <div className="anli anli1">
                                <AnliLink imageData={imageDatas[0]}/>
                            </div>
                            {/*<div className="anli anli2">
                                <AnliLink imageData={imageDatas[1]}/>
                            </div>
                            <div className="anli anli3">
                                <AnliLink imageData={imageDatas[2]}/>
                            </div>
                            <div className="anli anli4">
                                <AnliLink imageData={imageDatas[3]}/>
                            </div>
                            <div className="anli anli5">
                                <AnliLink imageData={imageDatas[4]}/>
                            </div>
                            <div className="anli anli6">
                                <AnliLink imageData={imageDatas[5]}/>
                            </div>
                            <div className="anli anli7">
                                <AnliLink imageData={imageDatas[6]}/>
                            </div>*/}
                        </div>
                    </div>
                    <div className="home-part-two">
                    </div>
                </div>
                {/*内容结束*/}
            </div>
            <div className="anli-content">
                {/*<Etong />*/}
            </div>
       </div>
    )
  }
}

export default Home;