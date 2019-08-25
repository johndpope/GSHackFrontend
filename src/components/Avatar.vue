<template lang="pug">
  .avatar-img
    b-img.img(rounded="circle", :style="image_style", blank-color="#ddd", :blank="error || !src", :src="src", @error="error = true", @click="$emit('click')")
    .platform(v-if="platform", :style="platform_style")
      v-icon.icon(:name="platformTranslated", scale="1", :style="icon_style")
</template>

<script>
export default {
  data () {
    return {
      error: false
    }
  },
  name: 'Avatar',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    src: {
      type: String,
      default: ''
    },
    platform: {
      type: String,
      default: ''
    }
  },
  computed: {
    image_style () {
      let style = {},
          size = 70

      switch (this.size) {
        case 'xxs':
          size = 30
          break
        case 'xs':
          size = 40
          break
        case 'sm':
          size = 50
          break
        case 'md':
          size = 60
          break
        case 'lg':
          size = 80
          break
        case 'xl':
          size = 100
          break
      }

      style.width = `${size}px`
      style.height = `${size}px`

      return style
    },
    platform_style () {
      let style = {},
          position = '-4px',
          width = '',
          height = ''

      switch (this.size) {
        case 'xxs':
          position = '-30%'
          width = '25px'
          height = '25px'
          break
        case 'xs':
          position = '-20%'
          break
        case 'sm':
          position = '-17%'
          break
        case 'md':
          position = '-10%'
          break
        case 'lg':
          position = 0
          break
        case 'xl':
          position = 0
          break
      }

      style.bottom = position
      style.right = position

      if (width) {
        style.width = width
      }

      if (height) {
        style.height = height
      }

      return style
    },
    icon_style () {
      let style = {},
          bottom, right

      switch (this.size) {
        case 'xxs':
          bottom = '3px'
          right = '4px'
          break
      }

      if (bottom) style.bottom = bottom
      if (right) style.right = right

      style.color = this.platformColor

      return style
    },
    platformTranslated () {
      switch (this.platform) {
        case 'facebook':
          return 'brands/facebook'
          break
        case 'twitter':
        case 'twitterDM':
          return 'brands/twitter'
          break
        case 'messenger':
          return 'brands/facebook-messenger'
          break
        case 'whatsapp':
          return 'brands/whatsapp'
          break
        case 'sandbox':
          return 'vial'
          break
        default:
          return 'comment'
      }
    },
    platformColor () {
      switch (this.platform) {
        case 'facebook':
          return '#4267b2'
          break
        case 'twitter':
        case 'twitterDM':
          return 'rgb(29, 161, 242)'
          break
        case 'messenger':
          return '#09f'
          break
        case 'whatsapp':
          return '#07bc4c'
          break
        default:
          return '#0e5ccf'
      }
    }
  },
  watch: {
    src (value) {
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-img {
    position: relative;

    .img {
      object-fit: cover;
    }
  }

  .indicator-mask {
    mask-image: url("/mask.svg");
    mask-size: 100% 100%;
  }

  .platform {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: white;

    .icon {
      position: absolute;
      bottom: 6px;
      right: 7px;
    }
  }
</style>
