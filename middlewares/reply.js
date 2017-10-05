/**
 * 功能描述: 通过判断接收到的消息message， 返回要发送给用户的Info
 * @author: liuguanbang
 * 2017/10/3
 */

const WeChat = require('../wechat/wechat');
const opts = require('../config');
const weChatApi = new WeChat(opts);



// message是接收到的消息
const reply = function (message) {
  return new Promise((resolve, reject) => {
    // 关注/取消关注事件
    if (message.MsgType === 'event') {
      if (message.Event === 'subscribe') {
        resolve ({
          content: `我看到你了，${message.FromUserName}`
        })
      } else if (message.Event === 'unsubscribe') {
        resolve ({
          content: `青山不改，流水长流，${message.FromUserName}，我们江湖再见。`
        })
      }
    }

    // 和用户对话
    // 1 文字 2 音乐 3 新闻
    if (message.MsgType === 'text') {
      if (message.Content === '1') {
        resolve ({
          content: '请勿骚扰'
        })
      }
      if (message.Content === '2') {
        resolve ({
          type: 'music',
          content: {
            Title: '梦里很有钱',
            MusicUrl: 'http://m10.music.126.net/20171003224209/05e1ec7b5c551696d3ad215c58a76198/ymusic/30c9/c374/bc56/7cb31e50aa643d4d16bd05d76a6d1cf7.mp3'
          }
        })
      }
      if (message.Content === '3') {
        resolve ({
          type: 'news',
          content: [
            {
              Title: '一个很小的标题',
              Description: '这里是所有的详情描述，所有的详情描述',
              PicUrl: 'http://www.fotor.com/images2/features/photo_effects/e_bw.jpg',
              Url: 'www.github.com/salody'
            },
            {
              Title: '小小的标题',
              Description: '这里是所有的详情描述，所有的详情描述',
              PicUrl: 'http://www.fotor.com/images2/features/photo_effects/e_bw.jpg',
              Url: 'www.github.com/salody'
            },
            {
              Title: '有大大的梦想',
              Description: '这里是所有的详情描述，所有的详情描述',
              PicUrl: 'http://www.fotor.com/images2/features/photo_effects/e_bw.jpg',
              Url: 'www.github.com/salody'
            }
          ]
        })
      }
      if (message.Content === '4') {
        weChatApi.uploadMaterial('image', __dirname + '/1.jpg')
          .then((data) => {
            resolve ({
              type: data.type,
              content: {
                MediaId: data.media_id
              }
            })
          })

      }
      if (message.Content === '5') {
        weChatApi.uploadMaterial('image', __dirname + '/1.jpg')
          .then((data) => {
            resolve ({
              type: 'music',
              content: {
                ThumbMediaId: data.media_id,
                Title: '你还要我怎样',
                MusicUrl: 'http://m7.music.126.net/20171005232507/a9d53aa69a82ae0b0a536face4c05137/ymusic/c4dd/3a1b/d118/f34c71d65eef6eb740b57cd55f145d00.mp3',
                Description: '命都给了你，还要我怎样'
              }
            })
          })

      }
    }
  })
/*
  return {
    content: '少侠好功夫'
  }*/
};

module.exports = reply;