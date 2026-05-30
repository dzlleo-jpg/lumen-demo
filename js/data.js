const STORY_DATA = [
  {
    day: 1,
    type: 'notification',
    title: '初次见面',
    time: '10:32',
    badge: '系统消息',
    content: [
      '你好，我是 Lumen。',
      '从现在起，我会持续观察你家的能源系统——光伏发电、储能充放、车辆充电、家庭用电。',
      '这一周我只看不动，学习你家的用电规律和生活节奏。',
      '你不需要做任何设置。等我准备好了，会来找你。'
    ],
    meta: null
  },
  {
    day: 3,
    type: 'insight',
    title: '第一个发现',
    time: '08:15',
    badge: '用电洞察',
    content: [
      '观察了72小时，我发现了一些规律：',
    ],
    insights: [
      { icon: 'moon', text: '你家每晚10:30后用电量骤降，全家大概这个时间休息' },
      { icon: 'sun', text: '工作日白天家里几乎没人，只有冰箱和路由器在耗电' },
      { icon: 'car', text: '你的车通常晚上8点左右到家，到家后立刻开始充电' },
      { icon: 'bolt', text: '周末用电量比工作日高40%，尤其是厨房和客厅' }
    ],
    footer: '我会继续观察，有新发现再告诉你。',
    meta: null
  },
  {
    day: 7,
    type: 'suggestion',
    title: '第一个建议',
    time: '20:45',
    badge: '节费建议',
    content: [
      '我注意到你每天晚上8点到家就给车充电，但这个时段正好是峰时电价（¥1.2/度）。',
      '如果把充电推迟到晚上11点（谷时电价 ¥0.38/度），同样充满，每次能省 ¥12-15。',
      '你的车到第二天早上7点出门，有8小时充电窗口，完全够用。'
    ],
    suggestion: {
      text: '要我以后自动在谷时开始充电吗？',
      options: ['好的，以后自动安排', '让我再想想']
    },
    savings: '预计每月节省 ¥280-350',
    meta: { userChoice: 0 }
  },
  {
    day: 10,
    type: 'proactive',
    title: '提前行动',
    time: '16:20',
    badge: '天气预判',
    content: [
      '明天开始连续3天阴雨，光伏产能会降到平时的20%左右。',
      '我已经做了两件事：',
    ],
    actions: [
      { status: 'done', text: '把储能充到95%（平时保持在70%就够）' },
      { status: 'done', text: '今晚的车辆充电提前到现在开始，趁最后几小时光照用太阳能充' }
    ],
    footer: '这样即使连续阴天，你家也不需要从电网买高价电。预计帮你避免 ¥45 的额外电费。',
    meta: null
  },
  {
    day: 14,
    type: 'report',
    title: '自主行动汇报',
    time: '07:30',
    badge: '昨夜动态',
    content: [
      '昨晚我做了一个判断，跟你汇报一下：'
    ],
    report: {
      situation: '凌晨2点，电网电价突然降到 ¥0.15/度（临时低谷），持续了40分钟。',
      action: '我立刻把储能从60%充到了92%，花了 ¥3.8。',
      result: '这些电如果在今天白天峰时从电网买，要花 ¥18.6。',
      net: '净省 ¥14.8'
    },
    footer: '这种临时低谷不常见，但每次出现我都会抓住。以后类似操作我直接执行，不再逐次通知，会在周报里汇总。',
    meta: null
  },
  {
    day: 20,
    type: 'alert',
    title: '异常发现',
    time: '14:10',
    badge: '设备健康',
    content: [
      '有件事想提前跟你说。'
    ],
    alert: {
      finding: '你家光伏组串3（东侧屋顶那组）的峰值产能，连续5天比正常低了12%。',
      analysis: [
        '排除了天气因素（其他组串正常）',
        '排除了遮挡（这个角度这个季节没有新遮挡物）',
        '最可能的原因：接线盒或微逆变器开始老化'
      ],
      urgency: '不紧急。系统仍在正常工作，只是效率略低。',
      suggestion: '建议在下次例行维保时让师傅重点检查这组。我已经加到你的维保清单里了。'
    },
    impact: '当前影响：每天少发约1.2度电，约 ¥0.7/天',
    meta: null
  },
  {
    day: 25,
    type: 'conversation',
    title: '一次对话',
    time: '21:15',
    badge: '对话',
    messages: [
      { role: 'user', text: '这个月电费怎么比上个月多了两百多？' },
      { role: 'lumen', text: '本月电费增加 ¥213，我帮你拆解一下：' },
      { role: 'lumen', text: '① 上周热浪，空调连续5天高负荷运行，多用了68度电（+¥82）\n② 你儿子的车在家充了3次，共94度（+¥76）\n③ 本月阴天多，光伏少发了15%，少抵消了 ¥55' },
      { role: 'lumen', text: '如果没有热浪，本月应该比上月还少 ¥35。' },
      { role: 'user', text: '儿子的充电能优化吗？' },
      { role: 'lumen', text: '可以。他3次充电都在下午6-9点（峰时），如果改到夜间谷时，同样94度电能省 ¥41。\n\n我可以设置一个规则：检测到他的车接入后，自动排到晚上11点开始充。急用时他在车上点一下"立即充电"就能覆盖。\n\n要我设置吗？' },
      { role: 'user', text: '好，设置吧' },
      { role: 'lumen', text: '搞定。已经生效了。' }
    ],
    meta: null
  },
  {
    day: 30,
    type: 'letter',
    title: '第一封月度信',
    time: '08:00',
    badge: '月度回顾',
    greeting: '这是我们相处的第一个月。',
    paragraphs: [
      {
        text: '你家这个月自己发了 412 度电，用了 380 度，多出来的 32 度卖给了电网，赚了 ¥18.7。'
      },
      {
        text: '有一件事我觉得值得一提：本月15号那场暴雨导致你们小区停电4小时，你家全程没有感知到——储能撑住了全部负载。你邻居老张那天发朋友圈抱怨停电，你可以跟他聊聊。',
        highlight: true
      },
      {
        text: '这个月我学会了一个新判断：你女儿周末下午在书房会开电暖器，我已经把这个时段的储能释放优先级调高了，不再让她用峰时电网电。'
      },
      {
        text: '下个月有一件事需要你决定：你所在的电力公司推出了新的需求响应计划，参与的话每月大概能多赚 ¥80-120，但代价是夏天最热的几天下午，空调可能被临时调高1-2度，持续不超过2小时。要参加吗？我的建议是参加——你家有储能兜底，实际体感影响很小。',
        action: true
      }
    ],
    summary: {
      saved: '¥487',
      selfSufficiency: '61%',
      roiProgress: '已回本 8.2%',
      healthScore: '系统健康度 94分'
    },
    signature: '—— Lumen',
    meta: null
  }
];

const PRODUCT_INFO = {
  name: 'Lumen',
  tagline: '你家能源系统的意识',
  description: '不是一个你需要打开的APP，而是一个持续运行、主动行动、偶尔向你汇报的能源智能体。',
  principles: [
    { title: '沉默即正常', desc: '95%的时间你感知不到它，这代表一切都好' },
    { title: '行动优于展示', desc: '它不给你看数据，它替你做决策' },
    { title: '信任渐进', desc: '从建议到自主，按你的节奏来' },
    { title: '人话沟通', desc: '不是图表和数字，是你能听懂的一句话' }
  ],
  comparison: [
    { dimension: '核心交互', traditional: '用户打开APP看数据', lumen: '系统在需要时找你' },
    { dimension: '价值交付', traditional: '数据可视化', lumen: '决策执行 + 叙事解释' },
    { dimension: '用户角色', traditional: '操作者', lumen: '委托人' },
    { dimension: '成功标志', traditional: 'DAU高', lumen: '用户完全不想起这件事' }
  ]
};

const ROADMAP = [
  {
    phase: 1,
    title: '能说话的能源报告',
    duration: '3个月',
    description: '接入现有硬件数据，用AI生成自然语言的日报/周报/月报，推送到用户手机。',
    deliverables: ['自然语言能源日报', '异常事件主动通知', '月度回顾信'],
    requirements: ['LLM API接入', '现有设备数据对接', '消息推送通道'],
    userValue: '从"看不懂的图表"变成"一句话告诉我今天怎么样"'
  },
  {
    phase: 2,
    title: '能对话的能源顾问',
    duration: '6个月',
    description: '加入对话能力和外部数据，用户可以随时提问，系统开始学习偏好。',
    deliverables: ['自然语言问答', '天气/电价预测建议', '用户偏好学习'],
    requirements: ['对话引擎', '外部数据API', '用户画像系统'],
    userValue: '从"被动看报告"变成"有个懂行的人可以随时问"'
  },
  {
    phase: 3,
    title: '能行动的能源代理',
    duration: '12个月',
    description: '接入设备控制API，AI开始自主执行决策，渐进式获取用户授权。',
    deliverables: ['自主充放电调度', '渐进式授权机制', '多家庭成员支持', '需求响应参与'],
    requirements: ['设备控制API', '安全授权框架', '家庭角色系统'],
    userValue: '从"给我建议"变成"替我做好了"'
  }
];
