/**
 * 功能描述: 微信消息xml模板
 * @author: liuguanbang
 * 2017/10/3
 */

const tpl = function (info) {
  const baseTpl = `<ToUserName><![CDATA[${info.ToUserName}]]></ToUserName>
         <FromUserName><![CDATA[${info.FromUserName}]]></FromUserName>
         <CreateTime>${new Date().getTime()}</CreateTime>`;
  switch (info.MsgType) {
    case 'text':
      return (
        `<xml>
         ${baseTpl}
         <MsgType><![CDATA[text]]></MsgType>
         <Content><![CDATA[${info.content}]]></Content>
         </xml>`
      );
    case 'image':
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[image]]></MsgType>
        <Image>
        <MediaId><![CDATA[${info.content.MediaId}]]></MediaId>
        </Image>
        </xml>`
      );
    case 'voice':
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[voice]]></MsgType>
        <Voice>
        <MediaId><![${info.content.MediaId}]]></MediaId>
        </Voice>
        </xml>`
      );
    case 'video':
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[video]]></MsgType>
        <Video>
        <MediaId><![CDATA[${info.content.MediaId}]]></MediaId>
        <Title><![CDATA[${info.content.Title || '视频消息的标题'}]]></Title>
        <Description><![CDATA[${info.content.Description || '视频消息的描述'}]]></Description>
        </Video> 
        </xml>`
      );
    case 'music':
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[music]]></MsgType>
        <Music>
        <Title><![CDATA[${info.content.Title || '音乐标题'}]]></Title>
        <Description><![CDATA[${info.content.Description || '音乐描述'}]]></Description>
        <MusicUrl><![CDATA[${info.content.MusicUrl || '音乐链接'}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${info.content.HQMusicUrl || '高品质音乐链接'}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${info.content.ThumbMediaId}]]></ThumbMediaId>
        </Music>
        </xml>`
      );
    case 'news':
      // content是数组.代表多条图文消息
      let items = [];
      items = info.content.map((item) => {
        return (
          `<item>
          <Title><![CDATA[${item.Title}]]></Title> 
          <Description><![CDATA[${item.Description}]]></Description>
          <PicUrl><![CDATA[${item.PicUrl}]]></PicUrl>
          <Url><![CDATA[${item.Url}]]></Url>
          </item>`
        );
      });
      let itemsStr = items.join('');
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[news]]></MsgType>
        <ArticleCount>${items.length}</ArticleCount>
        <Articles>
        ${itemsStr}
        </item>
        </Articles>
        </xml>`
      );
  }
};

module.exports = tpl;