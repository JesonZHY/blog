export default {
	logo: 'BLOG-ADMIN',
	navBar: {
		active: '0',
		list: [{
				name: '首页',
				subActive: '0',
				submenu: [{
						icon: 'el-icon-s-home',
						name: '后台首页',
						pathname: 'index'
					},
					{
						icon: 'el-icon-s-claim',
						name: '博文列表',
						pathname: 'blog_list'
					},
					{
						icon: 'el-icon-s-claim',
						name: '标签管理',
						pathname: 'label_list'
					},
					{
						icon: 'el-icon-s-claim',
						name: '分类管理',
						pathname: 'category_list'
					}
				]
			},
			{
				name: '用户',
				subActive: '0',
				submenu: [{
					icon: 'el-icon-s-claim',
					name: '用户列表',
					pathname: 'user_list'
				}, {
					icon: 'el-icon-s-claim',
					name: '用户等级',
					pathname: 'user_level'
				}]
			},
			{
				name: '设置',
				subActive: '0',
				submenu: [{
					icon: 'el-icon-s-claim',
					name: '设置',
					pathname: 'setting_setting'
				},
				{
					icon: 'el-icon-s-claim',
					name: '管理员设置',
					pathname: 'admin_setting'
				}]
			}
		]
	}
}
