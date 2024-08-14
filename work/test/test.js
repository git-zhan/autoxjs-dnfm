'ui'
ui.layout(
  <vertical padding="16">
    <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red" />
  </vertical>
)
const view = ui.inflate(
  <vertical padding="16">
    <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red" />
    <horizontal>
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        角色职业
      </text>
      <spinner
        id="sp1"
        entries="狂战士|鬼泣|漫游"
        spinnerMode="dialog"
        layout_weight="3"
        gravity="left"
      />
    </horizontal>
    <horizontal>
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        角色时装
      </text>
      <spinner
        id="sp1"
        entries="雪人套|天空套|导师套"
        spinnerMode="dialog"
        layout_weight="3"
        gravity="left"
      />
    </horizontal>
    <horizontal>
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        搬砖地图
      </text>
      <spinner
        id="sp2"
        entries="布万家|山脊|绿都"
        spinnerMode="dialog"
        layout_weight="3"
        gravity="left"
      />
    </horizontal>
    <horizontal h="40sp">
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        自动分解
      </text>
      <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白" />
      <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝" />
      <checkbox id="cb2" h="*" layout_weight="1" text="粉" />
    </horizontal>
    <horizontal h="40sp">
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        自动出售
      </text>
      <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白" />
      <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝" />
      <checkbox id="cb2" h="*" layout_weight="1" text="粉" />
    </horizontal>
    <horizontal h="40sp">
      <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">
        启动日志
      </text>
      <checkbox id="cb1" h="*" layout_weight="4" checked="true" text="是" />
    </horizontal>
    <button id="ok">启动游戏</button>
  </vertical>
)
ui.setContentView(view)
ui.ok.click(function () {
  ui.finish()
  var w = floaty.window(
    <frame gravity="center">
      <text id="text">悬浮文字</text>
    </frame>
  )
  setTimeout(() => {
    w.close()
  }, 2000)
})
