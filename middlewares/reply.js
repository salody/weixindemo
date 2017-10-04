/**
 * 功能描述: 通过判断接收到的消息message， 返回要发送给用户的Info
 * @author: liuguanbang
 * 2017/10/3
 */

// message是接收到的消息
const reply = function (message) {
  // 关注/取消关注事件
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      return {
        content: `我看到你了，${message.FromUserName}`
      }
    } else if (message.Event === 'unsubscribe') {
      return {
        content: `青山不改，流水长流，${message.FromUserName}，我们江湖再见。`
      }
    }
  }

  // 和用户对话
  // 1 文字 2 音乐 3 新闻
  if (message.MsgType === 'text') {
    if (message.Content === '1') {
      return {
        content: '请勿骚扰'
      }
    }
    if (message.Content === '2') {
      return {
        type: 'music',
        content: {
          Title: '梦里很有钱',
          MusicUrl: 'http://m10.music.126.net/20171003224209/05e1ec7b5c551696d3ad215c58a76198/ymusic/30c9/c374/bc56/7cb31e50aa643d4d16bd05d76a6d1cf7.mp3'
        }
      }
    }
    if (message.Content === '3') {
      return {
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
      }
    }
  }

  return {
    content: '少侠好功夫，无法承受'
  }
};

module.exports = reply;