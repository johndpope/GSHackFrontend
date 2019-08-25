<template lang="pug">
	.side-modal
		.sidemodal-background(v-if="value", @click="closeSideModal")
		.modal-container.scrollable-area(:class="{'is-open': value}", :style="getSideModalSize")
			.close-button(:style="{padding: padding ? close_padding : '10px'}")
				x-icon.pointer(@click="closeSideModal")
			.slot-container(:style="{padding: padding != undefined ? container_padding : ''}")
				slot
</template>

<script>
export default {
	data () {
		return {
			close_padding: '30px',
			container_padding: '0 30px 30px'
		}
	},
	mode: {
		prop: 'value',
		event: 'input'
	},
	name: 'SideModal',
	methods: {
		closeSideModal () {
			this.$emit('input', !this.value)
		}
	},
	props: {
		size: {
			type: String,
			default: 'md'
		},
		padding: {
			type: Boolean,
			default: undefined
		},
		value: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getSideModalSize () {
			if (this.size == 'lg') {
				if (this.$breakpoint.md) {
					return {
						width: '90%',
						right: '-90%'
					}
				} else {
					return {
						width: '100%',
						right: '-100%'
					}
				}
			}

			let size = 400
			switch (this.size) {
				case 'md':
					size = 400
					break
				case 'sm':
					size = 300
					break
			}

			return {width: `${size}px`, right: `-${size}px`}
		}
	}
}
</script>

<style lang="scss" scoped>
	.side-modal {
		position: fixed;
		z-index: 10;
	}

	.modal-container {
    width: 400px;
		overflow: hidden;
    overflow-y: auto;
    border-left: 1px solid #e3ebf6;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    right: -400px;
		transition: 0.5s;
		max-width: 100%;
  }

	.sidemodal-background {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.1);
  }

	@media (max-width: 425px) {
    .modal-container {
			border-left: none;

			&.is-open {
        right: 0 !important;
				width: 100%;
      }
    }
  }

  @media (min-width: 426px) {
    .modal-container {
      &.is-open {
        right: 0 !important;
      }
    }
  }

	.close-button {
		display: block;
	}

	slot.container {
		padding: 0 1rem 1rem;
	}
</style>
