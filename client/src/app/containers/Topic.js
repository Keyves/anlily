import React from 'react'
import BigSearch from './components/BigSearch'
import CommonLink from './components/CommonLink'
import { Link } from 'react-router'

import './styles/topic.scss'

/*topic组件结构
* -Topic
*  - BigSearch
*  - TopicForm
*  - TopicContent
*/

var imageDatas = require('./data/topic.json');
// 利用自执行函数， 将图片名信息转成图片URL路径信息
function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL1 = require('./images/topic/' + singleImageData.file1);
        singleImageData.imageURL2 = require('./images/topic/' + singleImageData.file2);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
}
imageDatas = genImageURL(imageDatas);


class TopicForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
                <form role="form" className="topic-form">
                    <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="" />
                        最新发布
                    </label>
                    <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="" />
                        点击最多
                    </label>
                    <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="" />
                        综合
                    </label>
                </form>
        )
    }
}

class TopicContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <CommonLink imageData={imageDatas[0]}/>
                <CommonLink imageData={imageDatas[1]}/>
                <CommonLink imageData={imageDatas[2]}/>
                <CommonLink imageData={imageDatas[3]}/>
            </div>
        )
    }
}

class Topic extends React.Component{
    render() {
        return(
            <div className="wrapper">
                <div className="topic-banner">
                    <BigSearch />
                </div>
                <TopicForm />
                <TopicContent />
            </div>
        )
    }
}

export default Topic;