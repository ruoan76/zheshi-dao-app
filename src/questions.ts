export interface Choice {
  text: string;
  tradition: 'ru' | 'shi' | 'dao';
}

export interface Question {
  id: number;
  scenario: string;
  choices: [Choice, Choice, Choice];
}

export const questions: Question[] = [
  {
    id: 1,
    scenario: '你在团队项目中付出了很多心血，但最终成果被归在了领导名下。你会怎么想、怎么做？',
    choices: [
      { text: '通过正式渠道与领导沟通，确认贡献的归属，维护团队的规则和公平', tradition: 'ru' },
      { text: '名利本如浮云，重要的是过程中的成长和内心的平静', tradition: 'shi' },
      { text: '不必急于争辩，顺势而为，在合适的时机自然展现自己的价值', tradition: 'dao' },
    ],
  },
  {
    id: 2,
    scenario: '周末你独自来到郊外，发现一座荒废已久的庭院，杂草丛生但花木依然顽强生长。你最大的感受是？',
    choices: [
      { text: '可惜了一座好的院落，想着若有资金和规划，定能将它修缮一新', tradition: 'ru' },
      { text: '世间万物自有其盛衰荣枯，这荒凉中有一种宁静的美', tradition: 'shi' },
      { text: '这才是它最好的样子——自然接管了一切，野趣横生，无需人为干预', tradition: 'dao' },
    ],
  },
  {
    id: 3,
    scenario: '一位老友向你倾诉他的婚姻困境。作为朋友，你最可能给出的建议是？',
    choices: [
      { text: '婚姻是一种责任与承诺，应当理性分析问题所在，寻求建设性的解决之道', tradition: 'ru' },
      { text: '放下执念，很多痛苦源于我们对外界的期待，不如先安顿好自己的心', tradition: 'shi' },
      { text: '别想太多，顺其自然。两个人在一起，合则聚不合则散，强求不得', tradition: 'dao' },
    ],
  },
  {
    id: 4,
    scenario: '你获得了一笔意外之财，数额不小。你最想用它来做什么？',
    choices: [
      { text: '给家人改善生活条件，为子女教育做准备，有余力再帮助身边的亲友', tradition: 'ru' },
      { text: '捐出一部分给需要的人，物质的丰裕不如心灵的富足来得持久', tradition: 'shi' },
      { text: '用它去旅行，去体验不同的生活，去尝试一些从未想过的事', tradition: 'dao' },
    ],
  },
  {
    id: 5,
    scenario: '公司要推行一项新的考核制度，你明知这会让很多同事感到压力巨大。你会？',
    choices: [
      { text: '制度有其必要性，虽然严苛，但能激励人上进，应当支持并帮助同事适应', tradition: 'ru' },
      { text: '压力来自内心的攀比和不安，重要的是帮助每个人找到自己的节奏和定力', tradition: 'shi' },
      { text: '管得太紧反而不好，好的工作环境应该是自由的，让人自然发挥', tradition: 'dao' },
    ],
  },
  {
    id: 6,
    scenario: '你最喜欢的放松方式是？',
    choices: [
      { text: '读一本好书，或者参加一场有深度的对话和交流', tradition: 'ru' },
      { text: '冥想、静坐，或者到一个安静的地方放空自己', tradition: 'shi' },
      { text: '走进大自然，散步、爬山或坐在河边看水流动', tradition: 'dao' },
    ],
  },
  {
    id: 7,
    scenario: '你如何看待"成功"这件事？',
    choices: [
      { text: '成功是在社会中立足，实现自我价值的同时为社会做出贡献', tradition: 'ru' },
      { text: '真正的成功是内心的安宁——不被外界的得失所牵动', tradition: 'shi' },
      { text: '成功不是追求什么，而是发现自己本来就不缺什么', tradition: 'dao' },
    ],
  },
  {
    id: 8,
    scenario: '一个年轻人在你面前抱怨社会不公、命运不济。你会对他说？',
    choices: [
      { text: '社会有它的规则和秩序，要想改变现状，先提升自己的能力和格局', tradition: 'ru' },
      { text: '苦难是人生的常态，怨天尤人只会加重痛苦，不如学会与它和平共处', tradition: 'shi' },
      { text: '别被别人的标准绑架，你的人生不必和别人比，找到适合自己的路就好', tradition: 'dao' },
    ],
  },
  {
    id: 9,
    scenario: '你受邀参加一个社交晚宴，到场的人大多不认识。你的状态更接近？',
    choices: [
      { text: '主动与人交流，结识新朋友，拓展自己的人脉圈子', tradition: 'ru' },
      { text: '在一旁安静观察，若有人搭话便友善回应，不必刻意融入', tradition: 'shi' },
      { text: '找个舒服的角落待着，感受现场的氛围，自在就好', tradition: 'dao' },
    ],
  },
  {
    id: 10,
    scenario: '面对一个重要的职业选择：高薪但不喜欢 vs 低薪但充满热情。你会？',
    choices: [
      { text: '综合考虑家庭责任、社会地位和发展前景，做出最有利的理性选择', tradition: 'ru' },
      { text: '外在条件都是暂时的，关键是这份工作是否能让内心安定', tradition: 'shi' },
      { text: '跟随直觉，做让自己感到自由和快乐的事，不要被世俗标准束缚', tradition: 'dao' },
    ],
  },
  {
    id: 11,
    scenario: '你怎样看待"礼仪"和"规矩"？',
    choices: [
      { text: '礼仪是文明社会的基石，让人与人之间的交往有秩序、有分寸', tradition: 'ru' },
      { text: '礼仪是外在的约束，真正重要的是内心的善意和对他人的慈悲', tradition: 'shi' },
      { text: '规矩太多反而让人失去本真，真诚比礼貌的形式更重要', tradition: 'dao' },
    ],
  },
  {
    id: 12,
    scenario: '如果有一天你发现自己生了一场大病，你的第一反应是？',
    choices: [
      { text: '积极治疗，同时妥善安排家里事务，不让家人因自己的病而陷入困境', tradition: 'ru' },
      { text: '生死有常，与其恐惧不如坦然面对，借这个机会重新审视人生', tradition: 'shi' },
      { text: '身体的变化也是自然的一部分，调养身心，顺应身体的节律', tradition: 'dao' },
    ],
  },
  {
    id: 13,
    scenario: '你如何看待"竞争"？',
    choices: [
      { text: '竞争是推动进步的动力，良性的竞争让人变得更优秀', tradition: 'ru' },
      { text: '竞争的本质是攀比之心，过度执着于胜负只会增加烦恼', tradition: 'shi' },
      { text: '万物各有其道，不必与他人争，做好自己就够了', tradition: 'dao' },
    ],
  },
  {
    id: 14,
    scenario: '你认为教育的目的是什么？',
    choices: [
      { text: '培养有品德、有能力的人，让他们在社会中承担责任、贡献力量', tradition: 'ru' },
      { text: '让人认识自我、觉悟本性，最终从困惑和痛苦中解脱', tradition: 'shi' },
      { text: '保持好奇心，发展独立思考的能力，不被既定的框架所限制', tradition: 'dao' },
    ],
  },
  {
    id: 15,
    scenario: '夜深人静时，你偶尔会想到百年之后。此时你内心的声音更接近？',
    choices: [
      { text: '希望后世能记得我做过的有意义的的事，家族和精神能够传承下去', tradition: 'ru' },
      { text: '一切都是因缘和合，来处来去处去，不必过分牵挂', tradition: 'shi' },
      { text: '我本是天地万物中的一部分，回归自然，如同落叶归根', tradition: 'dao' },
    ],
  },
];
