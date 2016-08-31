import React from 'react'
import './styles/topicTwo.scss'
import CommonLink from './components/CommonLink'

var imageDatas = require('./data/recommend.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL1 = require('./images/topic-unlight/' + singleImageData.file1);
        singleImageData.imageURL2 = require('./images/topic-unlight/' + singleImageData.file2);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
}

imageDatas = genImageURL(imageDatas);


class TopicTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="wrapper topic-two-wrapper">
                <div className="topic-two-content">
                    <img src={require('./images/topic-unlight/unlight-banner.png')} alt="unlight版头"/>
                    <div className="topic-two-intro">
                        <p>
                            居住在“狂气山脉”的魔女“炎之圣女”，<br/>
                            为了复仇而意图建立一个死者组成的军团。<br/>
                            玩家扮演“炎之圣女”制作的人偶的人们，<br/>
                            魔女想要将那些对尘世还有心结未了却抱憾而终的战士们聚集起来，<br/>
                            让他们成为攻陷人间的力量。<br/>
                        </p>
                        <p>在这个充斥着战乱的世界，<br/>
                            拥有各式各样的过去的死者们被聚集在一起。<br/>
                            自杀者，被谋杀者，贵族，贫民，罪犯，<br/>
                            过去与出身都各不相同的人们，<br/>
                            为了再一次回到人间，<br/>
                            和魔女及她的仆人们联合起来，然而……<br/>
                        </p>
                        <p>故事围绕着“魔女的真正目的”，“能否回到人间”，<br/>
                            “玩家与战士的关系”，“新势力的登场”等谜团，逐步发展……<br/>
                            unlight是一款网页卡片收集对战游戏。<br/>
                        </p>
                    </div>
                    <img src={require('./images/topic-unlight/unlight-intro.png')} alt="unlight截图"/>
                    <p>游戏大厅界面</p>
                </div>
                <div className="topic-two-recommand">
                    <p>大家的推荐</p>
                    <div>
                        <span><CommonLink imageData={imageDatas[0]}/></span>
                        <span><CommonLink imageData={imageDatas[1]}/></span>
                        <span><CommonLink imageData={imageDatas[2]}/></span>
                        <span><CommonLink imageData={imageDatas[3]}/></span>
                        <span><CommonLink imageData={imageDatas[4]}/></span>
                        <span><CommonLink imageData={imageDatas[5]}/></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicTwo;