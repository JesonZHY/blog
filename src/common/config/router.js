let routes = [
	{
		path: '/',
		name: 'layout',
		redirect: {name: 'index'},
		component: 'layout',
		children: [
			{
				meta: { title: '后台首页' },
				component: 'index/index'
			},
			{
				meta: { title: '博文列表' },
				component: 'blog/list'
			},
			{
				meta: { title: '发表博文' },
				component: 'blog/publisher'
			},
			{
				meta: { title: '标签管理' },
				component: 'label/list'
			},
			{
				meta: { title: '分类管理' },
				component: 'category/list'
			},
			{
				meta: { title: '用户列表'},
				component: 'user/list'
			},
			{
				meta: { title: '用户等级'},
				component: 'user/level'
			},
			{
				meta: { title: '设置'},
				component: 'setting/setting'
			},
			{
				meta: { title: '管理员设置'},
				component: 'admin/setting'
			}
		]
	},
	{
		meta: { title: '登录页' },
		component: 'login/index'
	},
	{
		path: '*',
		redirect: {name: 'index'}
	}
]

let getRoutes = function(){
	createRoute(routes)
	return routes
}

function createRoute(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) {
			return
		}
		let val = getValue(arr[i].component)
		arr[i].name = arr[i].name || val.replace(/\//g, '_')
		arr[i].path = arr[i].path || `/${val}`
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = ()=> componentFun
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}

function getValue(str) {
	let index = str.lastIndexOf('/')
	let value = str.substring(index+1, str.length)
	if (value === 'index') {
		return str.substring(index, -1)
	}
	return str
}

export default getRoutes()