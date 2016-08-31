import React from 'react'
import './styles/etong.css'

class Etong extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({

        })
    }

    render() {
        return(
            <div>
                <span className="right-arrow" onClick={this.handleClick}></span>
                <div className="anli-paper">
                    <img src={require('./images/home/anli-content/title-img.jpg')} alt="" className="img-responsive"/>
                    <div className="etong-content">
                        <h1>纸做的钱比铁做的钱更厉害</h1>
                        <p>８接下来是9<br/>
                            冬天之后是春天
                        </p>
                        <p>火可真是奇妙的东西<br/>
                            这么安静而平和<br/>
                            内里潜藏的却尽是力量与破坏<br/>
                            火一定掩饰了某些东西<br/>
                            就和人类一样<br/>
                            不靠近些看的话<br/>
                            有时根本不知道里面藏着什么<br/>
                            有时不吃些苦头<br/>
                            就看不清真相
                        </p>
                        <p>动画电影《恶童》（鉄コン筋クリート），于06年12月23日公映。<br/>
                            《恶童》是日本漫画家松本大洋的另类风格作品，单行本全3卷，销量突破100万部。<br/>
                            作品的舞台宝町参考了大量日本、中国上海、泰国的建筑，绝妙地展现出亚洲风味，给人一种怀念的感觉<br/>
                            。在06年的第19届东京国际电影节上，《恶童》作为特别邀请作品参加。同时，它还和今敏的《红辣椒》<br/>
                            一起被选为第79届奥斯卡金像奖最佳动画的提名候选作品。作品以靠义理、人情和黑帮维系的荒废小城“
                        </p>
                        <p>b站传送门：********</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Etong;