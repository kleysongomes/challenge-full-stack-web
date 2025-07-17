<template>
  <v-app>
    <v-navigation-drawer app permanent width="220" color="grey-lighten-4">
      <v-list class="pa-0">
        <!-- LOGO GRUPO A -->
        <v-list-item class="justify-center">
          <v-img
            :src="logo"
            max-width="500"
            contain
            class="mt-4 mb-2"
          />
        </v-list-item>

        <!-- TÍTULO DO MÓDULO -->
        <v-list-item>
          <v-list-item-title class="text-subtitle-1 font-weight-bold px-4">
            Módulo Acadêmico
          </v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />

        <!-- MENU -->
        <v-list-item
          :active="$route.path.startsWith('/students')"
          class="px-4"
          @click="$router.push('/students')"
        >
          <v-list-item-title class="text-body-2 font-weight-medium">
            Alunos
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import logo from '@/assets/grupo-a.png'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      logo
    }
  }
}
</script>
