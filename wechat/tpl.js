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
      // todo 现在只支持回复一条图文信息。如果需要支持多条。需要将传来的info改造成数组进行遍历
      // todo 等以后需要用到该业务时再进行改造。
      return (
        `<xml>
        ${baseTpl}
        <MsgType><![CDATA[news]]></MsgType>
        <ArticleCount>1</ArticleCount>
        <Articles>
        <item>
        <Title><![CDATA[${info.content.Title}]]></Title> 
        <Description><![CDATA[${info.content.Description}]]></Description>
        <PicUrl><![CDATA[${info.content.PicUrl}]]></PicUrl>
        <Url><![CDATA[${info.content.Url}]]></Url>
        </item>
        </Articles>
        </xml>`
      );
  }
};

module.exports = tpl;