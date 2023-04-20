<template>
	<view class="wyb-pagination-box" :style="{
		paddingLeft: padding + 'rpx',
		paddingRight: padding + 'rpx',
		'--hover': autoHover}">
		<view class="wyb-pagination-left" :style="{opacity: currentPage === 1 ? 0.5 : 1}">
			<view
			 v-if="showFirst"
			 :class="'wyb-pagination-first-page-' + (showIcon ? 'i' : 't')"
			 :style="btnStyleStr" 
			 :hover-class="currentPage === 1 ? '' : 'wyb-pagination-hover'"
			 @tap="onPageBtnTap('first-page')">
				<view v-if="showIcon" class="iconfont icon-shuangjiantou left-arrow" />
				<text v-else>{{firstText}}</text>
			</view>
			<view 
			 :class="'wyb-pagination-prev-page-' + (showIcon ? 'i' : 't')"
			 :style="btnStyleStr"
			 :hover-class="currentPage === 1 ? '' : 'wyb-pagination-hover'"
			 @tap="onPageBtnTap('prev-page')">
				<view v-if="showIcon" class="iconfont icon-danjiantou left-arrow" />
				<text v-else>{{prevText}}</text>
			</view>
		</view>
		<view class="wyb-pagination-info" @tap.stop="onInfoTap">
			<view class="wyb-pagination-num" v-if="!infoClick">
				<text :style="{color: currentColor}">{{currentPage}}</text>
				<text class="wyb-pagination-span" :style="{color: pageInfoColor}">/</text>
				<text :style="{color: pageInfoColor}">{{totalPage}}</text>
				<text 
				 v-if="showTotalItem"
				 class="wyb-pagination-info-total"
				 :style="{color: RGBChange(pageInfoColor, 0.5, 'light')}">
					({{totalItems}})
				</text>
			</view>
			<!-- #ifndef MP-WEIXIN || APP-VUE || APP-NVUE || APP-PLUS || APP-PLUS-NVUE -->
			<view class="wyb-pagination-input" v-else>
				<input 
				 type="number" 
				 v-model="inputPage" 
				 :onpaste="false"
				 :focus="infoFocus" 
				 :value="currentPage"
				 :style="{color: currentColor}"
				 :cursor-spacing="cursorSpacing"
				 @confirm="onInfoConfirm" 
				 @blur="onInfoBlur" />
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || APP-VUE || APP-NVUE || APP-PLUS || APP-PLUS-NVUE -->
			<view class="wyb-pagination-input" v-else>
				<input 
				 type="number" 
				 v-model="inputPage" 
				 :focus="infoFocus" 
				 :name="currentPage"
				 :style="{color: currentColor}"
				 :cursor-spacing="cursorSpacing"
				 @confirm="onInfoConfirm" 
				 @blur="onInfoBlur" />
			</view>
			<!-- #endif -->
		</view>
		<view class="wyb-pagination-right" :style="{opacity: currentPage === totalPage ? 0.5 : 1}">
			<view
			 :class="'wyb-pagination-next-page-' + (showIcon ? 'i' : 't')"
			 :style="btnStyleStr"
			 :hover-class="currentPage === totalPage ? '' : 'wyb-pagination-hover'"
			 @tap="onPageBtnTap('next-page')">
				<view v-if="showIcon" class="iconfont icon-danjiantou right-arrow" />
				<text v-else>{{nextText}}</text>
			</view>
			<view
			 v-if="showLast"
			 :class="'wyb-pagination-last-page-' + (showIcon ? 'i' : 't')"
			 :style="btnStyleStr"
			 :hover-class="currentPage === totalPage ? '' : 'wyb-pagination-hover'"
			 @tap="onPageBtnTap('last-page')">
				<view v-if="showIcon" class="iconfont icon-shuangjiantou right-arrow" />
				<text v-else>{{lastText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: this.current || 1,
				inputPage: '',
				infoClick: false,
				infoFocus: false
			}
		},
		computed: {
			totalPage() {
				return Math.ceil(parseFloat(this.totalItems) / parseFloat(this.pageItems))
			},
			autoHover() {
				if (this.btnStyle.backgroundColor) {
					return this.RGBChange(this.btnStyle.backgroundColor, 0.1, 'dark')
				} else {
					return this.RGBChange('#f8f8f8', 0.05, 'dark')
				}
			},
			btnStyleStr() {
				let styleStr = ''
				for (let key in this.btnStyle) {
					styleStr += `${this.sortFieldMatch(key)}: ${this.btnStyle[key]}; `
				}
				return styleStr
			}
		},
		watch: {
			current(val) {
				const oPage = this.currentPage
				if (!Object.is(oPage, val)) {
					this.currentPage = val
					this.$emit('change', {
						type: 'prop-page', 
						current: this.currentPage,
					})
				}
			}
		},
		props: {
			totalItems: {
				type: [String, Number],
				default: 20
			},
			pageItems: {
				type: [String, Number],
				default: 5
			},
			current: {
				type: Number,
				default: 1
			},
			prevText: {
				type: String,
				default: '上一页'
			},
			nextText: {
				type: String,
				default: '下一页'
			},
			firstText: {
				type: String,
				default: '首页'
			},
			lastText: {
				type: String,
				default: '尾页'
			},
			pageInfoColor: {
				type: String,
				default: '#494949'
			},
			currentColor: {
				type: String,
				default: '#007aff'
			},
			padding: {
				type: [String, Number],
				default: 15
			},
			btnStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			showIcon: {
				type: Boolean,
				default: false
			},
			showTotalItem: {
				type: Boolean,
				default: false
			},
			showFirst: {
				type: Boolean,
				default: true
			},
			showLast: {
				type: Boolean,
				default: true
			},
			couldInput: {
				type: Boolean,
				default: true
			},
			cursorSpacing: {
				type: Number,
				default: 0
			}
		},
		methods: {
			onPageBtnTap(type) {
				switch (type) {
					case 'first-page':
						if (!Object.is(this.currentPage, 1)) {
							this.currentPage = 1
							this.$emit('change', {type, current: this.currentPage})
						}
						break
					case 'prev-page':
						if (!Object.is(this.currentPage, 1)) {
							this.currentPage--
							this.$emit('change', {type, current: this.currentPage})
						}
						break
					case 'next-page':
						if (!Object.is(this.currentPage, this.totalPage)) {
							this.currentPage++
							this.$emit('change', {type, current: this.currentPage})
						}
						break
					case 'last-page':
						if (!Object.is(this.currentPage, this.totalPage)) {
							this.currentPage = this.totalPage
							this.$emit('change', {type, current: this.currentPage})
						}
						break
				}
			},
			onInfoTap() {
				if (this.couldInput) {
					this.infoClick = true
					this.inputPage = this.currentPage
					setTimeout(() => {
						this.infoFocus = true
					}, 10)
				}
			},
			onInfoConfirm(e) {
				let input = e.detail.value
				const oPage = this.currentPage
				if (parseFloat(input) > this.totalPage) {
					this.currentPage = this.totalPage
				} else if (parseFloat(input) < 1) {
					this.currentPage = 1
				} else if (input === '') {
					this.currentPage = oPage
				} else {
					this.currentPage = parseFloat(input)
				}
				if (!Object.is(oPage, this.currentPage)) {
					this.$emit('change', {
						type: 'input-page', 
						current: this.currentPage,
					})
				}
				this.infoClick = false
				this.$nextTick(() => {
					this.infoFocus = false
				})
			},
			onInfoBlur(e) {
				let input = e.detail.value
				const oPage = this.currentPage
				if (parseFloat(input) > this.totalPage) {
					this.currentPage = this.totalPage
				} else if (parseFloat(input) < 1) {
					this.currentPage = 1
				} else if (input === '') {
					this.currentPage = oPage
				} else {
					this.currentPage = parseFloat(input)
				}
				if (!Object.is(oPage, this.currentPage)) {
					this.$emit('change', {
						type: 'input-page', 
						current: this.currentPage,
					})
				}
				this.infoClick = false
				this.$nextTick(() => {
					this.infoFocus = false
				})
			},
			RGBChange(color, level, type) {
				// 判断颜色类型
				let r = 0,
					g = 0,
					b = 0,
					hasAlpha = false,
					alpha = 1
				if (color.indexOf('#') !== -1) {
					// hex转rgb
					if (color.length === 4) {
						let arr = color.split('')
						color = '#' + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3]
					}
					let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)]
					r = parseInt(color16List[0], 16)
					g = parseInt(color16List[1], 16)
					b = parseInt(color16List[2], 16)

				} else {
					hasAlpha = color.indexOf('a') !== -1
					let root = color.slice()
					let idx = root.indexOf('(') + 1
					root = root.substring(idx)
					let firstDotIdx = root.indexOf(',')
					r = parseFloat(root.substring(0, firstDotIdx))
					root = root.substring(firstDotIdx + 1)
					let secondDotIdx = root.indexOf(',')
					g = parseFloat(root.substring(0, secondDotIdx))
					root = root.substring(secondDotIdx + 1)
					if (hasAlpha) {
						let thirdDotIdx = root.indexOf(',')
						b = parseFloat(root.substring(0, thirdDotIdx))
						alpha = parseFloat(root.substring(thirdDotIdx + 1))
					} else {
						b = parseFloat(root)
					}
				}

				let rgbc = [r, g, b]
				// 减淡或加深
				for (var i = 0; i < 3; i++)
					type === 'light' ? rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]) : rgbc[i] = Math.floor(rgbc[i] * (1 -
						level))

				if (hasAlpha) {
					return `rgba(${rgbc[0]}, ${rgbc[1]}, ${rgbc[2]}, ${alpha})`
				} else {
					return `rgb(${rgbc[0]}, ${rgbc[1]}, ${rgbc[2]})`
				}
			},
			sortFieldMatch(field) {
				const stringArray = field.split('')
				let newField = field
				stringArray.forEach(t => {
					if (/[A-Z]/.test(t)) {
						newField = field.replace(t, `-${t.toLowerCase()}`)
					}
				})
				return newField
			}
		}
	}
</script>

<style>
	@import 'iconfont.css';
	.wyb-pagination-box {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	
	.wyb-pagination-left {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}
	
	.wyb-pagination-right {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	.wyb-pagination-first-page-t,
	.wyb-pagination-prev-page-t,
	.wyb-pagination-next-page-t,
	.wyb-pagination-last-page-t {
		font-size: 27rpx;
		padding: 14rpx 25rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		border: 1px solid #e5e5e5;
		white-space: nowrap;
	}
	
	.wyb-pagination-first-page-i,
	.wyb-pagination-prev-page-i,
	.wyb-pagination-next-page-i,
	.wyb-pagination-last-page-i {
		font-size: 27rpx;
		padding: 14rpx 33rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		border: 1px solid #e5e5e5;
		white-space: nowrap;
	}

	.wyb-pagination-first-page-t,
	.wyb-pagination-first-page-i {
		margin-right: 15rpx;
	}

	.wyb-pagination-last-page-t,
	.wyb-pagination-last-page-i {
		margin-left: 15rpx;
	}

	.wyb-pagination-info {
		font-size: 33rpx;
		white-space: nowrap;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
	
	.wyb-pagination-input input {
		text-align: center;
	}

	.wyb-pagination-span {
		margin: 0 2rpx;
	}
	
	.wyb-pagination-info-total {
		margin-left: 10rpx;
	}
	
	.wyb-pagination-first-page-t:active,
	.wyb-pagination-prev-page-t:active,
	.wyb-pagination-next-page-t:active,
	.wyb-pagination-last-page-t:active,
	.wyb-pagination-first-page-i:active,
	.wyb-pagination-prev-page-i:active,
	.wyb-pagination-next-page-i:active,
	.wyb-pagination-last-page-i:active {
		background-color: var(--hover) !important;
	}
	
	.left-arrow {
		transform: scale(0.9);
		margin-right: 5rpx;
	}
	
	.right-arrow {
		margin-left: 5rpx;
		transform: scale(0.9) rotate(180deg);
		-webkit-transform: scale(0.8) rotate(180deg);
	}
</style>
