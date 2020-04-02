<template>
	<div class="bg-white px-3" style="margin-left: -20px; margin-top: -15px; margin-right: -20px;">
		<div class="d-flex" style="padding: 10px 0px;">
			<el-button size="mini" type="success" @click="createLabel">新增标签</el-button>
			<el-button size="mini" type="primary" @click="createLabelType">新增标签类型</el-button>
			<div class="ml-auto">
				<el-input v-model="searchKeyword" placeholder="要搜索的标签名称" size="mini" style="width: 12.5rem;"></el-input>
				<el-button class="ml-2" type="success" size="mini">搜索</el-button>
			</div>
		</div>
		<el-table ref="multipleTable" class="mt-0" :data="tableData" max-height="1050" border style="width: 100%; margin-bottom: 55px;"
		 @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="45" align="center">
			</el-table-column>
			<el-table-column prop="id" label="ID" show-overflow-tooltip width="45" align="center">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="300">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="300">
				<template slot-scope="scope">
					<div class="d-flex">
						{{ scope.row.type }}
						<span :style="{background : scope.row.color}" style="padding: 10px 20px; margin-right: auto; margin-left: 30px;"></span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="300">
				<template slot-scope="scope">
					{{ scope.row.status === 0 ? '启用' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column prop="operation" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="success" size="mini" @click="editLabel(scope.row)">编辑</el-button>
					<el-button type="warning" size="mini">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 新建|编辑标签模态框 -->
		<el-dialog :title="isEditLabel ? '编辑标签' : '新建标签'" :visible.sync="blogLabelModel" width="60%" :before-close="handleClose">
			<el-form v-model="labelForm" label-width="80px">
				<el-form-item>
					<el-input style="display: none;" v-model="labelForm.labelId"></el-input>
				</el-form-item>
				<el-form-item label="标签名称">
					<el-input v-model="labelForm.labelName" placeholder="请输入标签名称..."></el-input>
				</el-form-item>
				<el-form-item label="标签类型">
					<el-select v-model="labelForm.labelType" placeholder="请选择">
						<el-option v-for="(item, index) in labelTypes" :key="index" :value="item.name + item.color" :label="item.name">
							<div class="d-flex">
								{{item.name}}
								<span :style="{background: item.color}" style="padding: 10px 20px; margin: auto;"></span>
							</div>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标签状态">
					<el-radio-group v-model="labelForm.labelStatus">
						<el-radio :label="0">启用</el-radio>
						<el-radio :label="1">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="blogLabelModel = false">取消</el-button>
				<el-button type="primary" @click="saveBlogLabel">确定</el-button>
			</span>
		</el-dialog>

		<!-- 新建标签类型模态框 -->
		<el-dialog title="新建标签类型" :visible.sync="blogLabelTypeModel" width="60%" :before-close="handleClose">
			<el-form v-model="labelType" label-width="80px">
				<el-form-item label="类型名称">
					<el-input v-model="labelType.name" placeholder="请输入标签名称..."></el-input>
				</el-form-item>
				<el-form-item label="类型颜色">
					<el-color-picker v-model="labelType.color"></el-color-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="blogLabelTypeModel = false">取消</el-button>
				<el-button type="primary" @click="saveBlogLabelType">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				labelStatus: 0,
				isEditLabel: false,
				blogLabelModel: false,
				blogLabelTypeModel: false,
				searchKeyword: '',
				multipleSelection: [],
				operation: {},
				labelForm: {
					labelId: '',
					labelName: '',
					labelType: '',
					labelStatus: ''
				},
				labelType: {
					name: '',
					color: ''
				},
				labelTypes: [],
				tableData: []
			}
		},
		methods: {
			createLabelType() {
				this.blogLabelTypeModel = true
				this.labelType = {}
			},
			saveBlogLabelType() {
				this.labelTypes.push({
					name: this.labelType.name,
					color: this.labelType.color
				})
				this.blogLabelTypeModel = false
			},
			saveBlogLabel() {
				if (this.labelForm.labelId != undefined) {
					let items = this.tableData.filter(row => row.id !== this.labelForm.labelId)
					let newLabelTypeAndColor = this.labelForm.labelType.split('#')
					let item = {
						id: this.labelForm.labelId,
						name: this.labelForm.labelName,
						type: newLabelTypeAndColor[0],
						color: '#' + newLabelTypeAndColor[1],
						status: this.labelForm.labelStatus
					}
					items.push(item)
					this.tableData = items
				} else {
					let newLabelTypeAndColor = this.labelForm.labelType.split('#')
					this.tableData.push({
						id: this.labelForm.labelId === undefined ? '0' : 'this.labelForm.labelId',
						name: this.labelForm.labelName,
						type: newLabelTypeAndColor[0],
						color: '#' + newLabelTypeAndColor[1],
						status: this.labelForm.labelStatus
					})
				}
				this.blogLabelModel = false
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 新建标签
			createLabel() {
				this.blogLabelModel = true
				this.labelForm = {}
			},
			// 编辑标签
			editLabel(obj) {
				this.isEditLabel = true
				this.labelForm = {
					labelId: obj.id,
					labelName: obj.name,
					labelType: obj.type + obj.color,
					labelStatus: obj.status
				}
				this.blogLabelModel = true
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		}
	}
</script>

<style>
</style>
