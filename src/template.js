import layoutAside from './components/home/layout-aside'
import layoutHeader from './components/home/layout-header'
import breadCrumb from './components/common/breadcrumb'
import { quillEditor } from 'vue-quill-editor'
// vue-quill-editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import Vue from 'vue'
console.log(quillEditor)

export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-a', quillEditor)
  }
}
