<template>
	<div class="bg-white px-3" style="margin-left: -20px; margin-top: -15px; margin-right: -20px;">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab, index) in blogTabs" :key="index">
				<div class="d-flex">
					<el-button v-for="(btn, index) in buttonItem" :type="btn.type" :key="index" size="mini" @click="buttonClick(btn)">{{ btn.name }}</el-button>
					<div class="ml-auto">
						<el-input placeholder="要搜索的博文名称" size="mini" style="width: 12.5rem;"></el-input>
						<el-button type="success" size="mini">搜索</el-button>
						<el-button size="mini" @click="advanceSearch = true">高级搜索</el-button>
					</div>
				</div>
				<el-card class="box-card mt-3" v-show="advanceSearch">
					<div slot="header" class="clearfix" style="margin: -10px;">
						<span>高级搜索</span>
						<el-button style="float: right; padding: 3px 0" type="text" size="small" @click="advanceSearch = false">收起</el-button>
					</div>
					<el-form inline ref="form" :model="form" label-width="80px">
						<el-form-item label="博文名称">
							<el-input placeholder="博文名称" size="mini" style="width: 200px;" v-model="form.blogName"></el-input>
						</el-form-item>
						<el-form-item label="博文标签">
							<el-select v-model="form.blogLabel" size="mini" placeholder="请选择标签">
								<el-option v-for="(item, index) in blogLabels" :key="index" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="博文分类">
							<el-select v-model="form.blogCategory" size="mini" placeholder="请选择分类">
								<el-option v-for="(item, index) in blogCategories" :key="index" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<div class="px-2 d-flex align-items-center" style="margin-top: -20px; margin-bottom: -10px;">
							<el-button class="ml-auto" type="success" size="mini">搜索</el-button>
							<el-button class="ml-2" size="mini" @click="clearSearchItems">清除所有选项</el-button>
						</div>
					</el-form>
				</el-card>
				<el-table ref="multipleTable" class="mt-3" :data="tableData" max-height="1050" border style="width: 100%; margin-bottom: 55px;"
				 @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="45" align="center">
					</el-table-column>
					<el-table-column prop="id" label="ID" show-overflow-tooltip width="45" align="center">
					</el-table-column>
					<el-table-column prop="name" label="名称" width="300">
					</el-table-column>
					<el-table-column prop="author" label="作者" width="90" align="center">
					</el-table-column>
					<el-table-column prop="editDate" label="编辑日期" width="120" align="center">
					</el-table-column>
					<el-table-column prop="publishDate" label="发布日期" width="120" align="center">
					</el-table-column>
					<el-table-column prop="thisBlogCategory" label="分类" width="110" align="center">
					</el-table-column>
					<el-table-column prop="thisBlogLabel" label="标签" align="center">
						<el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain">
							{{ item.label }}
						</el-tag>
					</el-table-column>
					<el-table-column prop="operation" label="操作" width="300" align="center">
						<template slot-scope="scope">
							<el-button size="mini" v-for="(item, index) in operation" :key="index" :type="item.type" @click="buttonClick(item, scope.row)">
								{{ item.name }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- <div style="height: 60px;"></div> -->
				<el-footer class="border-top d-flex justify-content-center align-items-center position-fixed bg-white" style="left: 200px; width: calc(100% - 200px); bottom: 0px;"
				 z-index="100">
					<!-- 底部布局 -->
					<el-pagination background layout="prev, pager, next" :total="1000">
					</el-pagination>
				</el-footer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 0,
				advanceSearch: false,
				multipleSelection: [],
				operationActive: "0",
				buttonItem: [],
				buttonItems: [{
						name: '发表博文',
						sign: 'publishBlog',
						type: 'success',
						num: '0'
					},
					{
						name: '批量删除',
						sign: 'deleteInBatches',
						type: 'danger',
						num: '2'
					},
					{
						name: '批量预发布',
						sign: 'preReleaseInBatches',
						type: 'danger',
						num: '2'
					},
					{
						name: '批量发布',
						sign: 'releaseInBatches',
						type: 'primary',
						num: '1'
					},
					{
						name: '批量回退',
						sign: 'fallbackInBatches',
						type: 'danger',
						num: '1'
					},
					{
						name: '设为热门',
						sign: 'setAsHot',
						type: 'info',
						num: '0'
					},
					{
						name: '批量恢复',
						sign: 'recoveryInBatches',
						type: 'info',
						num: '3'
					},
					{
						name: '上移',
						sign: 'moveUp',
						type: '',
						num: ''
					},
					{
						name: '下移',
						sign: 'moveDown',
						type: '',
						num: ''
					}
				],
				blogTabs: [{
						name: "已发布"
					},
					{
						name: "预发布"
					},
					{
						name: "已保存"
					},
					{
						name: "回收站"
					}
				],
				blogLabels: [{
						value: '1',
						label: '标签一'
					},
					{
						value: '2',
						label: '标签二'
					}
				],
				blogCategories: [{
						value: '1',
						label: '分类一'
					},
					{
						value: '2',
						label: '分类二'
					}
				],
				form: {
					blogName: '',
					blogLabel: '',
					blogCategory: ''
				},
				tableData: [],
				items: [{
						type: '',
						label: '标签一'
					},
					{
						type: 'success',
						label: '标签二'
					},
					{
						type: 'info',
						label: '标签三'
					},
					{
						type: 'success',
						label: '标签四'
					},
					{
						type: 'success',
						label: '标签五'
					}
				],
				operation: [],
				operations: [{
						name: '下架',
						sign: 'lowerShelf',
						type: 'warning',
						num: '0'
					},
					{
						name: '预览',
						sign: 'preview',
						type: 'success',
						num: '1'
					},
					{
						name: '发布',
						sign: 'publish',
						type: 'danger',
						num: '1'
					},
					{
						name: '回退',
						sign: 'fallback',
						type: 'info',
						num: '1'
					},
					{
						name: '编辑',
						sign: 'edit',
						type: 'success',
						num: '2'
					},
					{
						name: '预发布',
						sign: 'prePublish',
						type: 'danger',
						num: '2'
					},
					{
						name: '删除',
						sign: 'moveToRecycleBin',
						type: 'danger',
						num: '2'
					},
					{
						name: '恢复',
						sign: 'recovery',
						type: 'success',
						num: '3'
					},
					{
						name: '删除',
						sign: 'deleteForever',
						type: 'danger',
						num: '3'
					}
				]
			}
		},
		created() {
			this.__init()
			for (let i = 0; i < 20; i++) {
				this.tableData.push({
					id: i,
					editDate: '2016-05-02',
					author: '王小虎',
					name: '看什么看',
					thisBlogCategory: 'Java',
					publishDate: '2016-10-01',
					order: 0
				})
			}
		},
		computed: {
			operationItems() {
				return this.operations.filter(ops => ops.num === this.operationActive)
			},
			buttonsItem() {
				return this.buttonItems.filter(btn => btn.num == this.operationActive || btn.num == '')
			}
		},
		methods: {
			__init() {
				this.operation = this.operationItems
				this.buttonItem = this.buttonsItem
			},
			handleClick(tab, event) {
				this.operationActive = tab.index
				this.operation = this.operationItems
				this.buttonItem = this.buttonsItem
				// 不同页面的表格是不一样的，要分别对待
				// console.log(this.$refs.multipleTable)
				// 打印结果为：有四个table，数组形式
				this.$refs.multipleTable[this.activeName].clearSelection();
			},
			clearSearchItems() {
				this.form = {
					blogName: '',
					blogLabel: '',
					blogCategory: ''
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 点击事件
			buttonClick(obj, row) {
				let methods = this.$options.methods
				methods[obj.sign + "Event"](obj, row, this)	//由此匹配的方法中this指的并不是vue对象，所以需要参数传递
			},
			publishBlogEvent(obj, row, self) {
				self.$router.push({
					name: 'blog_publisher'
				})
			},
			deleteInBatchesEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("批量删除点击了")
			},
			preReleaseInBatchesEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("批量预发布点击了")
			},
			releaseInBatchesEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("批量发布点击了")
			},
			fallbackInBatchesEvent(obj, row) {
				console.log(this.multipleSelection)
				console.log(obj)
				console.log(row)
				console.log("批量回退点击了")
			},
			setAsHotEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("设为热门点击了")
			},
			recoveryInBatchesEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("批量恢复点击了")
			},
			moveUpEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("上移点击了")
			},
			moveDownEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("下移点击了")
			},
			lowerShelfEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("下架点击了")
			},
			previewEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("预览点击了")
			},
			publishEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("发布点击了")
			},
			fallbackEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("发布点击了")
			},
			editEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("编辑点击了")
			},
			prePublishEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("预发布点击了")
			},
			moveToRecycleBinEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("删除(移动到回收站)点击了")
			},
			recoveryEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("恢复点击了")
			},
			deleteForeverEvent(obj, row) {
				console.log(obj)
				console.log(row)
				console.log("删除点击了")
			}
		}
	}
</script>

<style>
</style>
