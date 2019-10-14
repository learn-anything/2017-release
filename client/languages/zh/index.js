const mdfile = require('../utils').mdfile;
const md = require('../utils').md;

module.exports = {
  // Help
  welcome_text: md(
    'Learn Anything 是一个致力于帮助你用**最高效的方法**了解各种课题的知识搜索平台，我们也有自己的社区提供支持。'
  ),
  searchbar_help_text_0:
    '通过在上面的栏中输入课题来开始搜索。',
  searchbar_help_text_1: '或, ',
  searchbar_help_text_anything: '点击这里查看所有课题',

  // Dialog
  dialog_cancel: '取消',
  dialog_done: '完成',

  // Contribute button
  contribute_button_text: '完善地图',
  contribute_button_text_editing: '完成',
  contribute_add_resource: '添加资源',

  // New resource
  new_resource_add_resource: '添加资源',
  new_resource_name: '名称',
  new_resource_category: '类别',
  new_resource_url: '资源链接',

  // Searchbar
  searchbar_nodes_count: '节点',
  searchbar_new_search: '开始新的搜索',
  searchbar_suggestions_title: '建议',
  first_search_title: '我要学习',

  // Sidebar
  sidebar_login: '登录',
  sidebar_logout: '退出登录',
  sidebar_home: '主页',
  sidebar_all_topics: '所有课题',
  sidebar_support: '支持',
  sidebar_about: '关于',
  sidebar_twitter: 'Twitter',
  sidebar_patreon: '众筹',
  sidebar_github: 'GitHub',
  sidebar_legend: 'Legend',
  sidebar_lists: '策划名单',

  // About
  about: mdfile('about', 'zh'),

  // Legend
  legend: mdfile('legend', 'zh'),
  legend_title: 'Legend',

  // Breadcrumbs
  breadcrumbs_mobile_path: 'path:',

  // Map
  unauthorized_dialog: mdfile('unauthorized', 'zh'),
  node_resources: 'Resources',
  resources_show_more: 'Show {} More',
};
