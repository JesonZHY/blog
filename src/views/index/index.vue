<template>
	<div>
		<!-- 统计卡片 -->
		<el-row :gutter="20">
			<el-col :span="8" v-for="(item, index) in counts" :key="index">
				<el-card shadow="hover">
					<div class="d-flex align-items-center">
						<i :class="item.icon" class="border h4 mb-0 text-white mr-3" style="width: 40px; height: 40px; text-align: center; line-height: 40px;"></i>
						<div>
							<h4 class="mb-1">{{item.num}}</h4>
							<small class="text-muted">{{item.desc}}</small>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 店铺商品展示&统计图 -->
		<el-row :gutter="20" class="mt-3">
			<el-col :span="24" class="d-flex flex-column">
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>后端服务器状态(CPU)</span>
					</div>
					<div ref="javaChart_cpu" style="height:260px;"></div>
				</el-card>
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>后端服务器状态(Mem)</span>
					</div>
					<div ref="javaChart_mem" style="height:260px;"></div>
				</el-card>
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>后端服务器状态(Storage)</span>
					</div>
					<div ref="javaChart_storage" style="height:260px;"></div>
				</el-card>
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>数据库服务器状态(CPU)</span>
					</div>
					<div ref="mysqlChart_cpu" style="height:260px;"></div>
				</el-card>
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>数据库服务器状态(Mem)</span>
					</div>
					<div ref="mysqlChart_mem" style="height:260px;"></div>
				</el-card>
				<el-card class="mb-auto" shadow="hover" style="height: 370px;">
					<div slot="header">
						<span>数据库服务器状态(Storage)</span>
					</div>
					<div ref="mysqlChart_storage" style="height:260px;"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				counts: [{
						icon: 'el-icon-user-solid bg-primary',
						num: 30,
						desc: '新增会员人数(个)'
					},
					{
						icon: 'el-icon-s-goods bg-success',
						num: 111,
						desc: '今日点赞总数(次)'
					},
					{
						icon: 'el-icon-money bg-secondary',
						num: 10086,
						desc: '今日阅读总数(篇)'
					}
				]
			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			drawLine() {
				
				let javaCpu = echarts.init(this.$refs.javaChart_cpu)
				let javaMem = echarts.init(this.$refs.javaChart_mem)
				let javaStorage = echarts.init(this.$refs.javaChart_storage)
				
				let mysqlCpu = echarts.init(this.$refs.mysqlChart_cpu)
				let mysqlMem = echarts.init(this.$refs.mysqlChart_mem)
				let mysqlStorage = echarts.init(this.$refs.mysqlChart_storage)
				
				function randomData() {
				    now = new Date();
				    value = Math.floor(Math.random()*(1 - 100) + 100);
				    return {
				        name: now.toString(),
				        value: [
							[now.getHours(), now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(), now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()].join(':'),
							value
						]
				    };
				}
				var now = new Date();
				var data = [];
				for (var i = 30; i > 0; i--) {
					var date = new Date(now - i * 1000)
					data.push({
						name: now.toString(),
						value: [
							[date.getHours(), date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()].join(":"),
							0
						]
					})
				}
				var seconds = 1000;
				var value = Math.floor(Math.random()*(1 - 100) + 100);

				var option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            animation: false
				        }
				    },
				    xAxis: {
				        type: 'category',
				        splitLine: {
				            show: false
				        }
				    },
				    yAxis: {
				        type: 'value',
				        boundaryGap: [0, '100%'],
						max: 100,
				        splitLine: {
				            show: false
				        }
				    },
				    series: [{
				        type: 'line',
				        showSymbol: false,
				        hoverAnimation: false,
				        data: data
				    }]
				};
				
				setInterval(function () {
					
				    data.push(randomData());
					
					if (data.length >= 30) {
						data.shift()
					}
					
					javaCpu.setOption(option);
					javaMem.setOption(option);
					javaStorage.setOption(option);
					
					mysqlCpu.setOption(option);
					mysqlMem.setOption(option);
					mysqlStorage.setOption(option);
				}, 1000);
			}
		}
	}
</script>

<style>
</style>
