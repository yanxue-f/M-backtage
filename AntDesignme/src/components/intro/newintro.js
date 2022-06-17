import introJs from 'intro.js'
import 'intro.js/introjs.css'

const intro = introJs()
// 更多配置参数请到官方文档查看
intro.setOptions({
  nextLabel: ' 下一个 ▷',  // 下一个按钮文字
  prevLabel: '◁ 上一个 ',  // 上一个按钮文字
  skipLabel: '╳',    // 跳过按钮文字
  doneLabel: '立即体验',// 完成按钮文字
  scrollPadding:'10', //以 px 为单位的滚动填充。默认值为 30 scrollToElement。true
  hidePrev: true,       // 在第一步中是否隐藏上一个按钮
  hideNext: false,       // 在最后一步中是否隐藏下一个按钮
  exitOnOverlayClick: true,  // 点击叠加层时是否退出介绍
  showStepNumbers: false,     // 是否显示红色圆圈的步骤编号
  disableInteraction: true,   // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
  showBullets: false,         // 是否显示面板指示点
  highlightClass:'hightlight',          //helperLayer 的附加 CSS 类
  tooltipClass:'tool-tip',            //将 CSS 类添加到所有工具提示
  overlayOpacity:'0.8',               //遮罩层透明度
})

export default intro