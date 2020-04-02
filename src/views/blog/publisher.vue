<template>
	<div class="bg-white" style="margin-top: -16px; margin-left: -19px; margin-right: -18px;">
		<el-button size="mini" class="px-1" @click="backToBlogList" style="position: absolute; top: 13px; left: 172px;">返回博文列表</el-button>

		<el-form v-model="form" label-width="80px">
			<el-form-item label="标题" style="margin-left: 2rem; padding-top: 16px;">
				<el-input v-model="form.name" style="width: 500px; margin-left: 20px;" size="mini" placeholder="博文标题"></el-input>
			</el-form-item>
			<el-form-item label="副标题" style="margin-left: 2rem; margin-top: -20px;">
				<el-input v-model="form.name" style="width: 500px; margin-left: 20px;" size="mini" placeholder="博文副标题"></el-input>
			</el-form-item>
			<el-form-item label="博文标签" style="margin-left: 2rem; margin-top: -20px;">
				<el-tag style="margin-left: 20px;" v-for="item in items" :key="item.label" :type="item.type" effect="plain" size="medium"
				 v-model="form.blogLabel" @click="choiceLable(item)">
					<div :class="{'border-danger' : item.isCheck}" class="border align-items-center" style="margin-left: -11px; margin-right: -11px; margin-top: -1px; padding-left: 8px; padding-right: 8px;">
						{{ item.label }}
					</div>
				</el-tag>
				<el-tag class="ml-4" size="small">
					<div><i style="cursor: pointer" @click="createBlogLabel">新建标签</i></div>
				</el-tag>
			</el-form-item>
			<el-form-item label="博文分类" style="margin-left: 2rem; margin-top: -20px;">
				<el-select style="margin-left: 20px; width: 500px;" v-model="form.blogCategory" size="mini" placeholder="请选择分类">
					<el-option v-for="(item, index) in blogCategories" :key="index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-tag class="ml-4" size="small">
					<div><i style="cursor: pointer" @click="createBlogCategories">新建分类</i></div>
				</el-tag>
			</el-form-item>
			<el-form-item label="正文" style="margin-left: 2rem; margin-top: -20px;">
				<div style="margin-left: 20px; width: 1500px; height: 900px">
					<quill-editor v-model="content" style="height: 800px;" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
					 @focus="onEditorFocus($event)" @change="onEditorChange($event)">
					</quill-editor>
				</div>
			</el-form-item>
			<el-form-item style="margin-left: 2rem; margin-top: -20px;">
				<el-button style="margin-left: 20px;" @click="saveHtml" type="success">保存</el-button>
				<el-button style="margin-left: 20px;" @click="cancelHtml" type="">取消</el-button>
			</el-form-item>
		</el-form>

		<!-- 新建标签模态框 -->
		<el-dialog title="新建标签" :visible.sync="blogLabelModel" width="60%" :before-close="handleClose">
			<el-form v-model="labelForm" label-width="80px">
				<el-form-item label="标签名称">
					<el-input v-model="labelForm.labelName" placeholder="请输入标签名称..."></el-input>
				</el-form-item>
				<el-form-item label="标签类型">
					<el-select>
						<el-option>1</el-option>
						<el-option>1</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标签状态">
					<el-radio name="labelStatus">1</el-radio>
					<el-radio name="labelStatus">2</el-radio>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="blogLabelModel = false">取消</el-button>
				<el-button type="primary" @click="saveBlogLabel">确定</el-button>
			</span>
		</el-dialog>
		
		<!-- 新建分类模态框 -->
		<el-dialog title="新建分类" :visible.sync="blogCategoryModel" width="60%" :before-close="handleClose">
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="blogCategoryModel = false">取消</el-button>
				<el-button type="primary" @click="saveBlogCategory">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				blogLabelModel: false,
				blogCategoryModel: false,
				form: {
					name: '',
					blogLabel: '',
					blogCategory: ''
				},
				labelForm: {
					labelName: '',
					labelDesc: ''
				},
				items: [{
						type: '',
						label: '标签',
						isCheck: false
					},
					{
						type: 'success',
						label: '标签二',
						isCheck: false
					},
					{
						type: 'info',
						label: '标签三',
						isCheck: false
					},
					{
						type: 'success',
						label: '标签四',
						isCheck: false
					},
					{
						type: 'success',
						label: '标签五',
						isCheck: false
					}
				],
				blogCategories: [],
				content: `<p>hello world</p>`,
				editorOption: {
					debug: 'warn',

					placeholder: 'Compose an epic...',
					readOnly: false,
					theme: 'snow'
				}
			}
		},
		methods: {
			backToBlogList() {
				this.$router.push({name:'blog_list'})
				// this.$router.go(-1)
			},
			choiceLable(label) {
				label.isCheck = !label.isCheck
			},
			onEditorReady(editor) { // 准备编辑器
			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus() {}, // 获得焦点事件
			onEditorChange() {}, // 内容改变事件
			saveHtml() {
				this.$message({
					type: 'success',
					message: this.content
				})
			},
			cancelHtml() {
				this.$router.go(-1)
			},
			createBlogLabel() {
				this.labelForm = {}
				this.blogLabelModel = true
			},
			createBlogCategories() {
				this.blogCategoryModel = true
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			saveBlogLabel() {
				console.log(this.labelForm)
				this.items.push({
					type: '',
					label: this.labelForm.labelName,
					isCheck: false
				})
				this.blogLabelModel = false; 
			},
			saveBlogCategory() {
				this.$message({
					type: 'success',
					message: '已保存分类'
				})
				this.blogCategoryModel = false
			}
		}
	}
</script>

<style>
</style>
