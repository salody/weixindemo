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
    else if (message.MsgType === 'text') {
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
        weChatApi.uploadMaterial('image', __dirname + '/2.jpg')
          .then((data) => {
            resolve ({
              type: 'music',
              content: {
                ThumbMediaId: data.media_id,
                Title: '你还要我怎样',
                MusicUrl: 'http://m10.music.126.net/20171006010646/966aa70f1a20a80fd170f4e0d7f5fe58/ymusic/681e/45fc/220f/083f3b9525df5ded32f7d84f1ffbc895.mp3',
                HQMusicUrl: 'http://m10.music.126.net/20171006010646/966aa70f1a20a80fd170f4e0d7f5fe58/ymusic/681e/45fc/220f/083f3b9525df5ded32f7d84f1ffbc895.mp3',
                Description: '来自薛之谦的内心独白'
              }
            })
          })

      }
      if (message.Content === '6') {
        weChatApi.uploadMaterial('pic', __dirname + '/1.jpg', true)
          .then((data) => {
            console.log(data);
            resolve ({
              type: data.type,
              content: {
                MediaId: data.media_id
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