import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { pt } from 'vuetify/locale'

export default createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
  locale: {
    locale: 'pt',
    fallback: 'pt',
    messages: { pt },
  },
})