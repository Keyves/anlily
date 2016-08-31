import React from 'react'
import CommonLink from './CommonLink'

class ImgLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageDatas: require(this.props.imageInfo.jsonLocaion)
        }
    }

    // 利用自执行函数， 将图片名信息转成图片URL路径信息
    genImageURL(imageDatasArr) {
        return function () {
            for (var i = 0, j = imageDatasArr.length; i < j; i++) {
                var singleImageData = imageDatasArr[i];

                singleImageData.imageURL1 = require(this.props.imageInfo.imageLocation + singleImageData.file1);
                singleImageData.imageURL2 = require(this.props.imageInfo.imageLocation + singleImageData.file2) ;

                imageDatasArr[i] = singleImageData;

                return imageDatasArr;
            }
        }.bind(this);
    }

    render() {
        return (
            <CommonLink imageData={(this.genImageURL(this.state.imageDatas).bind(this))[0]}/>
        )
    }
}

export default ImgLink;