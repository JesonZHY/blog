<template>
	<div class="bg-white px-3" style="margin-left: -20px; margin-top: -15px; margin-right: -20px;">
		<div class="border-bottom">
			<el-button class="my-2" size="mini" type="primary" @click="createTopCategory">新增顶级分类</el-button>
		</div>
		<el-tree :data="data" default-expand-all :expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<el-input v-if="data.editStatus" size="mini" style="width: 200px;" v-model="data.label"></el-input>
				<span v-else>{{ node.label }}</span>
				<span>
					<el-button :type="data.status ? 'success' : 'danger'" size="mini" @click="showOrHide(data)">{{ data.status ? '显示' : '隐藏'}}</el-button>
					<el-button type="info" size="mini" @click="createNodeCategory(data)">新增</el-button>
					<el-button :type="data.editStatus ? '' : 'primary'" size="mini" @click="editThisNode(data)">{{ data.editStatus ? '完成' : '编辑'}}</el-button>
					<el-button type="danger" size="mini" @click="deleteThisNode(node, data)">删除</el-button>
				</span>
			</span>
		</el-tree>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					id: 1,
					status: 1,
					editStatus: false,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						status: 1,
						editStatus: false,
						children: [{
							id: 9,
							status: 1,
							editStatus: false,
							label: '三级 1-1-1'
						}, {
							id: 10,
							status: 1,
							editStatus: false,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					status: 1,
					editStatus: false,
					label: '一级 2',
					children: [{
						id: 5,
						status: 1,
						editStatus: false,
						label: '二级 2-1'
					}, {
						id: 6,
						status: 1,
						editStatus: false,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					status: 1,
					editStatus: false,
					label: '一级 3',
					children: [{
						id: 7,
						status: 1,
						editStatus: false,
						label: '二级 3-1'
					}, {
						id: 8,
						status: 1,
						editStatus: false,
						label: '二级 3-2'
					}]
				}]
			}
		},
		computed: {

		},
		methods: {
			showOrHide(data) {
				data.status = data.status ? 0 : 1
			},
			editThisNode(data) {
				data.editStatus = !data.editStatus
			},
			deleteThisNode(node, data) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let parent = node.parent
					let children = parent.data.children || parent.data
					let index = children.findIndex(v => {
						return v.id === data.id
					})
					children.splice(index, 1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			createNodeCategory(data) {
				let newObj = {
					id: 2,
					status: 1,
					editStatus: true,
					label: '一级 2',
					children: []
				}
				data.children.push(newObj)
			},
			createTopCategory() {
				this.$prompt('请输入顶级分类名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValidator: function(val) {
						if (val === '' || val === null) {
							return '顶级分类名称不可为空'
						}
						return true
					}
				}).then(({ value }) => {
					this.data.push({
						id: 100,
						status: 1,
						editStatus: false,
						label: value,
						children: []
					})
					this.$message({
						type: 'success',
						message: '添加顶级分类“' + value + '”成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			}
		}
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
		padding-bottom: 2px;
	}

	.el-tree-node__content {
		position: relative;
		margin: 10px 10px;
		top: 10px;
		bottom: 10px;
	}
</style>
