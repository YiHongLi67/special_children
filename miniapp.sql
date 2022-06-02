/*
 SQLyog Ultimate v10.00 Beta1
 MySQL - 5.5.15 : Database - miniapp
 *********************************************************************
 */
/*!40101 SET NAMES utf8 */
;
/*!40101 SET SQL_MODE=''*/
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
`miniapp`
/*!40100 DEFAULT CHARACTER SET utf8 */
;
USE `miniapp`;
/*Table structure for table `child` */
DROP TABLE IF EXISTS `child`;
CREATE TABLE `child` (
  `child_id` varchar(50) NOT NULL,
  `parent_phone` char(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` varchar(50) NOT NULL,
  `disease` varchar(50) NOT NULL,
  PRIMARY KEY (`child_id`),
  KEY `child_id` (`child_id`),
  KEY `parent_phone` (`parent_phone`),
  CONSTRAINT `child_ibfk_1` FOREIGN KEY (`parent_phone`) REFERENCES `parent` (`parent_phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `child` */
insert into `child`(`child_id`, `parent_phone`, `name`, `age`, `disease`)
values (
    '02e99105-d808-11ec-aacd-fc4596939cb7',
    '14108161892',
    '七七',
    '7',
    '自闭'
  ),
(
    '17f566f0-d7ff-11ec-aeb1-fc4596939cb7',
    '15608161822',
    '芳芳',
    '12',
    '色盲'
  ),
(
    '1d847aff-d803-11ec-aeb1-fc4596939cb7',
    '15608161877',
    '七七',
    '6',
    '色盲'
  ),
(
    '2453a298-d7fd-11ec-aeb1-fc4596939cb7',
    '15608161888',
    '芳芳',
    '9',
    '色盲'
  ),
(
    '4128985b-d808-11ec-aacd-fc4596939cb7',
    '15108161892',
    '七七',
    '7',
    '自闭'
  ),
(
    '531dfb64-c23c-11ec-aab7-fc4596939cb7',
    '15608161890',
    '郝朋友',
    '10',
    '色盲'
  ),
(
    '53dcbfb4-d802-11ec-aeb1-fc4596939cb7',
    '13608161892',
    '芳芳',
    '5',
    '自闭'
  ),
(
    '7fcd49f4-d7fe-11ec-aeb1-fc4596939cb7',
    '15608161800',
    '芳芳',
    '6',
    '色盲'
  ),
(
    'a0981160-d80b-11ec-aacd-fc4596939cb7',
    '18808161890',
    '七七',
    '7',
    '自闭'
  ),
(
    'af01a5e1-d805-11ec-aeb1-fc4596939cb7',
    '13808161892',
    '七七',
    '7',
    '自闭'
  ),
(
    'dd9ca235-d808-11ec-aacd-fc4596939cb7',
    '15608162222',
    '七七',
    '7',
    '自闭'
  ),
(
    'ddcfc612-d7ff-11ec-aeb1-fc4596939cb7',
    '15608161812',
    '芳芳',
    '1',
    '色盲'
  ),
(
    'e58a9e19-d804-11ec-aeb1-fc4596939cb7',
    '13708161892',
    '七七',
    '7',
    '自闭'
  ),
(
    'faef5a6c-c23c-11ec-aab7-fc4596939cb7',
    '15608161895',
    '贾正经',
    '8',
    '耳鸣'
  ),
(
    'faef5e08-c23c-11ec-aab7-fc4596939cb7',
    '15608161896',
    '梅凉辛',
    '10',
    '自闭'
  ),
(
    'faef5e63-c23c-11ec-aab7-fc4596939cb7',
    '15608161897',
    '甄霄云',
    '6',
    '智残'
  ),
(
    'faef5eae-c23c-11ec-aab7-fc4596939cb7',
    '15608161894',
    '没事干',
    '7',
    '矮小'
  ),
(
    'fddfb53c-d803-11ec-aeb1-fc4596939cb7',
    '13508161892',
    '芳芳',
    '5',
    '自闭'
  );
/*Table structure for table `child_course` */
DROP TABLE IF EXISTS `child_course`;
CREATE TABLE `child_course` (
  `course_id` varchar(50) NOT NULL,
  `child_id` varchar(50) NOT NULL,
  `cpt_ratio` double NOT NULL,
  KEY `child_id` (`child_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `child_course_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child` (`child_id`),
  CONSTRAINT `child_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `child_course` */
insert into `child_course`(`course_id`, `child_id`, `cpt_ratio`)
values (
    'fbf2740b-c207-11ec-aab7-fc4596939cb7',
    '531dfb64-c23c-11ec-aab7-fc4596939cb7',
    0.3
  ),
(
    'ed15aae2-c2e8-11ec-a37c-fc4596939cb7',
    '531dfb64-c23c-11ec-aab7-fc4596939cb7',
    0.8
  ),
(
    'fe37eceb-c215-11ec-aab7-fc4596939cb7',
    'faef5e63-c23c-11ec-aab7-fc4596939cb7',
    0.7
  ),
(
    'df3e6554-c2cf-11ec-a37c-fc4596939cb7',
    'faef5e08-c23c-11ec-aab7-fc4596939cb7',
    0.3
  ),
(
    '9c30a0ea-c2cc-11ec-a37c-fc4596939cb7',
    'faef5eae-c23c-11ec-aab7-fc4596939cb7',
    0.6
  ),
(
    'b6d40009-c2cd-11ec-a37c-fc4596939cb7',
    'faef5e08-c23c-11ec-aab7-fc4596939cb7',
    0.6
  ),
(
    'df3e64d2-c2cf-11ec-a37c-fc4596939cb7',
    'faef5e08-c23c-11ec-aab7-fc4596939cb7',
    0.5
  ),
(
    'aef0f086-c2d0-11ec-a37c-fc4596939cb7',
    'faef5e08-c23c-11ec-aab7-fc4596939cb7',
    0.2
  ),
(
    'c4db32ea-c22e-11ec-aab7-fc4596939cb7',
    'faef5a6c-c23c-11ec-aab7-fc4596939cb7',
    0.7
  ),
(
    'b6dbec8e-c208-11ec-aab7-fc4596939cb7',
    'faef5a6c-c23c-11ec-aab7-fc4596939cb7',
    0.4
  ),
(
    'a9eeeaf7-c2eb-11ec-a37c-fc4596939cb7',
    '531dfb64-c23c-11ec-aab7-fc4596939cb7',
    0.4
  ),
(
    '9c30a067-c2cc-11ec-a37c-fc4596939cb7',
    'faef5eae-c23c-11ec-aab7-fc4596939cb7',
    0.3
  ),
(
    'c977f581-c2ca-11ec-a37c-fc4596939cb7',
    'faef5eae-c23c-11ec-aab7-fc4596939cb7',
    0.5
  );
/*Table structure for table `course` */
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` varchar(50) NOT NULL,
  `teacher_phone` char(11) NOT NULL,
  `key_words` varchar(20) NOT NULL,
  `summary` varchar(50) NOT NULL,
  `course_des` varchar(200) NOT NULL,
  `course_type` varchar(50) NOT NULL,
  `cover_url` varchar(500) NOT NULL DEFAULT '/static/images/per_back.png',
  `money` double DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `course_id` (`course_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `course` */
insert into `course`(
    `course_id`,
    `teacher_phone`,
    `key_words`,
    `summary`,
    `course_des`,
    `course_type`,
    `cover_url`,
    `money`
  )
values (
    '01598af0-d80c-11ec-aacd-fc4596939cb7',
    '15608161891',
    '自闭',
    '交朋友',
    '学会多交朋友，和别人沟通',
    'active',
    'https://img1.baidu.com/it/u=3457506316,406409479&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500',
    12
  ),
(
    '664b6f69-c2c9-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色盲',
    '调整心态',
    '色盲患者一定要注意调整自我心态，毕竟矫正色盲不是一两天就能完成的事情，必须要长期坚持才能看到一定的效果。',
    'nursing',
    'https://images.91160.com/ueditor/images/20211217/200420752/16397265667427.jpg',
    20
  ),
(
    '664b747a-c2c9-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色盲',
    '佩戴矫正眼镜',
    '一般色盲症患者佩戴矫正眼镜之后，对于以前辨认不清的图案就能够正确辨认，从而来达到矫正视觉障碍的作用。',
    'nursing',
    'https://img.alicdn.com/i4/69541350/O1CN016dVUOu1LqLCr4n8h4_!!69541350.jpg_q90.jpg',
    10
  ),
(
    '9c309cbe-c2cc-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '充足均衡的营养',
    '鼓励您的孩子每天吃得好，以确保摄入足够的蛋白质、碳水化合物和维生素，尤其是动物蛋白补充剂，以获得的蛋白质生物利用度。',
    'plan',
    'https://inews.gtimg.com/newsapp_bt/0/11948006412/1000',
    3
  ),
(
    '9c309fec-c2cc-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '坚持体育锻炼',
    '鼓励孩子每天至少进行20-40分钟的有效锻炼。在此期间，孩子的心率达到每分钟120-140次，出汗、发热、面色红润。',
    'plan',
    'https://picnew13.photophoto.cn/20190307/katongshiliangmiankoukeaidalanqiuderenwu-32458311_1.jpg',
    5
  ),
(
    '9c30a067-c2cc-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '早睡早起',
    '晚上是促进孩子成长的重要因素，督促孩子每天早睡早起，保证充足的8-10小时睡眠，使体内与生长发育相关的激素处于分泌和功能状态。',
    'plan',
    'https://p8.itc.cn/images01/20210401/d9f12a270fad441ebe50555a60b17fce.png',
    50
  ),
(
    '9c30a0ea-c2cc-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '关注孩子心理健康',
    '精神愉悦有利于促进婴儿的成长，而精神抑郁则可以抑制生长激素的分泌。因此，父母应该努力为孩子创造一个和平的环境，让他们快乐成长。',
    'plan',
    'https://pic4.zhimg.com/80/v2-c253d55b18ca7baa5ed52d98399ca09f_720w.jpg',
    17
  ),
(
    'a9eeeaf7-c2eb-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色弱',
    '适度用眼',
    '切勿过度用眼，用眼一小时要休息眼睛，可以做眼保健操或滴眼药水',
    'plan',
    'https://ss2.meipian.me/users/37244146/3d0f8222d9e241d4bfa00737c9b14275.jpg?imageView2/2/w/750/h/1400/q/80',
    13
  ),
(
    'a9eeefd2-c2eb-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色弱',
    '颜色辨认训练',
    '每天一小时的时间进行颜色辨认训练，色弱需特别注意相似色彩的分辨',
    'plan',
    'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200214/f76e7498405d4854ac58a1e6321f5cb3.jpeg',
    9
  ),
(
    'a9eef0dd-c2eb-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色弱',
    '画画',
    '画画需对色彩的敏感度极高，可以让孩子学习画画，在画画中认识分辨各色彩',
    'plan',
    'https://bpic.51yuansu.com/pic3/cover/01/30/37/5923c26a9df64_610.jpg',
    5
  ),
(
    'aef0f086-c2d0-11ec-a37c-fc4596939cb7',
    '15608161851',
    '自闭',
    '音乐治疗',
    '给孩子听一些舒缓的音乐，通过音乐的方式给儿童安抚和心理支持，稳定情绪行为，促进儿童各种心理能力的增长',
    'plan',
    'https://inews.gtimg.com/newsapp_bt/0/11013882009/641',
    4
  ),
(
    'b6d3fbaf-c2cd-11ec-a37c-fc4596939cb7',
    '15608161851',
    '自闭',
    '欢愉的家庭气氛',
    '幼儿期的生活环境对性格的形成和发展有着重要的作用。父母间的亲密和谐会使孩子感到温馨和愉悦。相反，父母的不和与争吵会使孩子在心理上产生压力，久而久之会影响身心健康。',
    'nursing',
    'http://img.mp.itc.cn/upload/20170406/a50481dc2b8e4adc811960b417370047_th.png',
    1
  ),
(
    'b6d40009-c2cd-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '触觉防御',
    '很多自闭症孩子会兼具触觉敏感的问题，回避耳朵被不经意的碰触，在剪发之前，可以先密集地预告，再稍微轻柔的按摩他的头发、颈项和耳朵，以稍微缓解孩子的紧张和抗拒。',
    'nursing',
    'https://p8.itc.cn/images01/20210713/f81af47cb6a84649a9c74855deac87d2.jpeg',
    8
  ),
(
    'b6d40079-c2cd-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '培养孩子的兴趣',
    '父母应引导孩子发展多种多样的兴趣，听故事、做游戏、画画、唱歌跳舞等，父母尽量参与其中，这不仅可以开发孩子的心智，而且可以加强父母与孩子间的感情交流。',
    'nursing',
    'http://e0.ifengimg.com/10/2019/0605/A5FE9D6E300E517F17C53F42F93953193A50F861_size816_w2805_h1984.jpeg',
    11
  ),
(
    'b6d400dc-c2cd-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '结交朋友',
    '对儿童来说，交朋友是一件快活自在的事，能联络感情、增长见识、提高应变和活动能力。',
    'nursing',
    'https://www.gongmingshe.com/res/20/dacb1422758e4808c176f4cdace75652.jpg',
    26
  ),
(
    'b6dbec8e-c208-11ec-aab7-fc4596939cb7',
    '15608161851',
    '耳鸣',
    '耳鸣',
    '久处噪声环境会会使本来开始衰退的听觉更容易疲劳，导致耳内的微细血管痉挛，供血减少，导致听力下降，造成噪声性耳聋。',
    'nursing',
    'https://imagepphcloud.thepaper.cn/pph/image/117/850/396.jpg',
    67
  ),
(
    'c4382e7d-c22e-11ec-aab7-fc4596939cb7',
    '15608161851',
    '智残',
    '智残',
    '运动能力训练 语言能力训练 社会行为训练',
    'plan',
    'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200401/94d0f3be66b74fdda8803727b733b412.jpeg',
    24
  ),
(
    'c4750be6-c22e-11ec-aab7-fc4596939cb7',
    '15608161891',
    '色盲',
    '色盲矫正镜',
    '分为隐形眼镜和普通框架，通过在镜片上特殊镀膜，使大脑分析两眼物象色差，来辨认正确的颜色，是矫正色弱较为有效的途径。',
    'plan',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.suning.cn%2Fuimg%2Fsop%2Fcommodity%2F998919548101247624739205_x.jpg&refer=http%3A%2F%2Fimage.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653299108&t=f9f5b3b32295ab0cd7469e0e0b9ccfde',
    47
  ),
(
    'c4db32ea-c22e-11ec-aab7-fc4596939cb7',
    '15608161851',
    '耳鸣',
    '耳鸣',
    '听觉口语训练 综合感官学习 音素辨听训练',
    'plan',
    'http://33erwo.com/UploadFiles/2016-12/168/2016120614261489542.jpg',
    29
  ),
(
    'c977efb7-c2ca-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '营养供给',
    '增加营养的供给，要给儿童平时多补充鱼虾等动物性蛋白，并且要配合补充锌、铁等微量元素。',
    'nursing',
    'https://inews.gtimg.com/newsapp_bt/0/12098836471/1000',
    27
  ),
(
    'c977f435-c2ca-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '坚持运动',
    '孩子平时多做踢毽子，跳绳，引体向上等运动，有助于身高的改善',
    'nursing',
    'http://5b0988e595225.cdn.sohucs.com/images/20190623/ffe9c5b471354e5d85b2a2cee8d7b1af.jpeg',
    24
  ),
(
    'c977f4ed-c2ca-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '充足睡眠',
    '因为睡眠充足以后，夜间生长激素的分泌相对来说会有所好转。',
    'nursing',
    'http://5b0988e595225.cdn.sohucs.com/images/20191021/fa33f89647374a3faf702c29ae9e7a5c.jpeg',
    79
  ),
(
    'c977f581-c2ca-11ec-a37c-fc4596939cb7',
    '15608161851',
    '矮小',
    '保持愉悦的心情',
    '孩子的心情愉悦以后也有助于生长激素的分泌，从而改善身高。',
    'nursing',
    'http://5b0988e595225.cdn.sohucs.com/images/20181017/9b450211bb5d4abea2b3119cbd1f4286.jpeg',
    10
  ),
(
    'd4988a6a-c2c5-11ec-a37c-fc4596939cb7',
    '15608161811',
    '色盲',
    '物理治疗',
    '如色彩锻炼、穴位刺激、仪器按摩等，可以对色弱的治疗有一定的辅助作用',
    'plan',
    'https://img.pconline.com.cn/images/upload/upc/tx/pc_best/1902/22/c13/133873679_1550824498157_width600.jpg',
    99
  ),
(
    'd498a1cb-c2c5-11ec-a37c-fc4596939cb7',
    '15608161811',
    '色盲',
    '视神经炎',
    '视神经炎患者需在医生指导下服用抗生素、糖皮质激素如泼尼松、扩血管药物如妥拉苏林、营养神经类药物如维生素B1、维生素B2，但需要在专业医师指导下使用',
    'plan',
    'https://p9.itc.cn/q_70/images01/20220310/f3cdb12c58d44f0f8ab00b220c254014.png',
    12
  ),
(
    'd498a2ad-c2c5-11ec-a37c-fc4596939cb7',
    '15608161811',
    '色盲',
    '白内障',
    '早期白内障患者可遵医嘱服用营养类药物，外用谷胱甘肽、苄达赖氨酸等滴眼液。严重的患者可行白内障囊外摘除术合并人工晶状体植入术，治疗后色弱的症状可得到明显改善',
    'plan',
    'https://p2.itc.cn/q_70/images01/20220310/3af1cead22b1429bbfaa994d0d635c11.png',
    1
  ),
(
    'd498a3ba-c2c5-11ec-a37c-fc4596939cb7',
    '15608161811',
    '色盲',
    '视网膜脱落',
    '视网膜脱落导致色弱的患者，通常以手术治疗为主。如果是脱离范围较小，脱离时间短，可通过巩膜环扎术进行，如果是视网膜脱落范围较大，甚至累及黄斑，可能需要行玻璃体切割术，同时复位视网膜',
    'plan',
    'https://pic1.zhimg.com/v2-5d2ef43bb47cc45823360baa1b2892f6_1440w.jpg?source=172ae18b',
    1
  ),
(
    'df3e60f3-c2cf-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '养一只宠物',
    '让自闭症患者自己选，与小动物的交流到心门的微开，一步步和自闭症患者交流。',
    'plan',
    'http://img.mp.itc.cn/upload/20170609/6051cfa1dcff40daa62cb53ec4e8c3d3_th.jpg',
    2
  ),
(
    'df3e64d2-c2cf-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '人际关系训练',
    '尝试给孩子结交一些朋友，联络感情、增长见识、提高应变和活动能力。',
    'plan',
    'http://p5.itc.cn/images01/20200619/61071058ead441a9aed66c6716958ebf.jpeg',
    4
  ),
(
    'df3e6554-c2cf-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    'ABA教学方法',
    '通过良好的行为强化和不良行为的消除，保留了好的行为，去除不好的行为，像攻击、自伤。',
    'plan',
    'https://pic2.zhimg.com/v2-95784ecc443e70797ec30f9a69915567_1440w.jpg?source=172ae18b',
    5
  ),
(
    'df3e65c0-c2cf-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '语言障碍训练',
    '通过视觉、词语卡、情景卡片，结合语音辅导的方法，得到改善语言表达、语言应用能力、内在的思维能力。',
    'plan',
    'https://inews.gtimg.com/newsapp_bt/0/13981134216/641',
    24
  ),
(
    'df3e662d-c2cf-11ec-a37c-fc4596939cb7',
    '15608161831',
    '自闭',
    '药物治疗',
    '如果合并精神症状，像焦虑、抑郁、强迫、多动等，可以使用精神科的药物治疗，改善相关症状。',
    'plan',
    'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190424/4dbce42260084e258c48d90b99afadb0.jpeg',
    32
  ),
(
    'eb45be90-d80b-11ec-aacd-fc4596939cb7',
    '15608161891',
    '自闭',
    '交朋友',
    '学会多交朋友，和别人沟通',
    'plan',
    'https://img1.baidu.com/it/u=3457506316,406409479&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500',
    12
  ),
(
    'ed15a706-c2e8-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色弱',
    '改善饮食',
    '经常食用含有维生素A、C食物，碱性食物，含钙铬食物，含核黄素食物等食物可以有效的预防和改善色盲现象，还可以有效的提高食用者的视力。',
    'nursing',
    'https://pic.ecook.cn/web/265171277.jpg!wh882',
    53
  ),
(
    'ed15aae2-c2e8-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色弱',
    '眼药水',
    '在医生的指导下每天坚持滴康复的眼药水。',
    'nursing',
    'https://img.xiangmu.com/uploadpic/201907/06/0609291661551725.png',
    31
  ),
(
    'ed15ab94-c2e8-11ec-a37c-fc4596939cb7',
    '15608161891',
    '色盲',
    '定期检查',
    '坚持每天做康复训练，定期去医院检查，对症下药',
    'nursing',
    'https://t10.baidu.com/it/u=296267781,1761388018&fm=173&app=49&f=JPEG?w=521&h=385&s=FDCAFF1651816DE34A51806703007039',
    22
  ),
(
    'f66ef5ff-d80b-11ec-aacd-fc4596939cb7',
    '15608161891',
    '色盲',
    '交朋友',
    '学会多交朋友，和别人沟通',
    'nursing',
    'https://img1.baidu.com/it/u=3457506316,406409479&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500',
    12
  ),
(
    'fbf2740b-c207-11ec-aab7-fc4596939cb7',
    '15608161891',
    '色盲',
    '按摩穴位',
    '平时可以采用针灸按摩的方法来提高自己的辨色能力，包括晴明穴，风池穴，丝竹空穴以及四白穴等。',
    'nursing',
    'http://n.sinaimg.cn/translate/230/w640h390/20180319/CwsD-fyskeua9319221.jpg',
    48
  ),
(
    'fe37eceb-c215-11ec-aab7-fc4596939cb7',
    '15608161851',
    '智残',
    '智残',
    '加强动作训练。动作训练包括抬头、翻身、坐、站、走等动作和平衡能力训练，训练孩子手、脑的协调能力。',
    'nursing',
    'http://qimg.cdnmama.com/bk/baike/2019/9/123RF-bk/1421-qinzi/665-3-6sui/12592751.jpg',
    63
  );
/*Table structure for table `finance` */
DROP TABLE IF EXISTS `finance`;
CREATE TABLE `finance` (
  `finance_id` varchar(50) NOT NULL,
  `child_id` varchar(50) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  `finance_name` varchar(50) NOT NULL,
  `finance_type` int(50) NOT NULL,
  PRIMARY KEY (`finance_id`),
  KEY `child_id` (`child_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `finance_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child` (`child_id`),
  CONSTRAINT `finance_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `finance` */
/*Table structure for table `finance_manager` */
DROP TABLE IF EXISTS `finance_manager`;
CREATE TABLE `finance_manager` (
  `fin_man_phone` char(11) NOT NULL,
  `role` int(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  PRIMARY KEY (`fin_man_phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `finance_manager` */
insert into `finance_manager`(`fin_man_phone`, `role`, `pwd`)
values ('15608161893', 3, 'qpal93');
/*Table structure for table `parent` */
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent` (
  `parent_phone` char(11) NOT NULL,
  `role` int(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  PRIMARY KEY (`parent_phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `parent` */
insert into `parent`(`parent_phone`, `role`, `pwd`)
values ('13508161890', 0, 'qpal135'),
('13508161892', 0, 'qpal135'),
('13608161892', 0, 'qpal136'),
('13708161892', 0, 'qpal137'),
('13808161892', 0, 'qal138'),
('14108161892', 0, 'qal141'),
('15108161892', 0, 'qal151'),
('15608161800', 0, 'qpal00'),
('15608161812', 0, 'qpal12'),
('15608161822', 0, 'qpal22'),
('15608161866', 0, 'qpal99'),
('15608161877', 0, 'qpal77'),
('15608161888', 0, 'qpal88'),
('15608161890', 0, 'qpal90'),
('15608161895', 0, 'qpal95'),
('15608161896', 0, 'qpal96'),
('15608161897', 0, 'qpal97'),
('15608162222', 0, 'qpal156'),
('18808161890', 0, 'qpal188');
/*Table structure for table `personal_manager` */
DROP TABLE IF EXISTS `personal_manager`;
CREATE TABLE `personal_manager` (
  `per_man_phone` char(11) NOT NULL,
  `role` int(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  PRIMARY KEY (`per_man_phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `personal_manager` */
insert into `personal_manager`(`per_man_phone`, `role`, `pwd`)
values ('15608161892', 2, 'qpal92');
/*Table structure for table `staff` */
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `staff_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `entry_time` date DEFAULT NULL,
  `leave_time` date DEFAULT NULL,
  `entering` int(50) DEFAULT NULL,
  `leaving` int(50) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `staff` */
/*Table structure for table `teacher` */
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacher_phone` char(11) NOT NULL,
  `role` int(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  PRIMARY KEY (`teacher_phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*Data for the table `teacher` */
insert into `teacher`(`teacher_phone`, `role`, `pwd`)
values ('15608161811', 1, 'qpal11'),
('15608161831', 1, 'qpal31'),
('15608161891', 1, 'qpal91');
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;