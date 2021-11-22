import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.accent4, // #00C853
        secondary: colors.red.accent3, // #FFCDD2
        accent: colors.green.accent4, // #00C853
      },
    },
  },
});
