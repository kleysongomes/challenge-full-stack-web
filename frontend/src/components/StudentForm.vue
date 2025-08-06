<template>
  <v-container fluid class="pa-0 pt-12">
    <v-card class="mx-4 pa-4">
      <!-- TÍTULO -->
      <v-card-title>
        {{ isEditMode ? 'Editar Aluno' : 'Cadastrar Aluno' }}
      </v-card-title>

      <!-- FORMULÁRIO -->
      <v-card-text>
        <v-form ref="form" v-model="formValid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="student.ra"
            label="RA"
            :disabled="isEditMode"
            :rules="rules.ra"
            required
            maxlength="6"
            class="mb-4"
          />
          <v-text-field
            v-model="student.name"
            label="Nome"
            :rules="rules.name"
            required
            class="mb-4"
          />
          <v-text-field
            v-model="student.email"
            label="Email"
            :rules="rules.email"
            required
            class="mb-4"
          />
          <v-text-field
            v-model="student.cpf"
            label="CPF"
            :disabled="isEditMode"
            :rules="rules.cpf"
            required
            maxlength="11"
            class="mb-4"
          />
        </v-form>
      </v-card-text>

      <!-- AÇÕES -->
      <v-card-actions class="justify-end gap-4">
        <v-btn text color="grey" @click="goBack">
          Cancelar
        </v-btn>
        <v-btn text color="primary" @click="handleSubmit">
          Salvar
        </v-btn>
      </v-card-actions>

      <!-- SNACKBAR -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.text }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StudentForm',
  data() {
    return {
      student: { ra: '', name: '', email: '', cpf: '' },
      formValid: false,
      snackbar: { show: false, text: '', color: '' },
      rules: {
        ra: [
          v => !!v || 'RA é obrigatório',
          v => /^\d{6}$/.test(v) || 'RA deve conter exatamente 6 dígitos numéricos'
        ],
        name: [
          v => !!v || 'Nome é obrigatório',
          v => /\s/.test(v) || 'Informe também o sobrenome'
        ],
        email: [
          v => !!v || 'Email é obrigatório',
          v => /.+@.+\..+/.test(v) || 'Email inválido'
        ],
        cpf: [
          v => !!v || 'CPF é obrigatório',
          v => /^\d{11}$/.test(v) || 'CPF deve conter exatamente 11 números'
        ]
      }
    }
  },
  computed: {
    isEditMode() {
      return !!this.$route.params.ra
    }
  },
  methods: {
    showSnackbar(message, color = 'green') {
      this.snackbar.text = message
      this.snackbar.color = color
      this.snackbar.show = true
    },
    async handleSubmit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return
      try {
        if (this.isEditMode) {
          await axios.put(`http://localhost:3000/students/${this.student.ra}`, {
            name: this.student.name,
            email: this.student.email
          })
          this.showSnackbar('Aluno atualizado com sucesso!')
        } else {
          await axios.post('http://localhost:3000/students', this.student)
          this.showSnackbar('Aluno cadastrado com sucesso!')
        }
        setTimeout(() => this.$router.push('/students'), 1000)
      } catch (error) {
        console.error('Erro ao salvar aluno:', error)
        const msg = error?.response?.data?.error || 'Erro ao salvar aluno. Verifique os dados.'
        this.showSnackbar(msg, 'red')
      }
    },
    goBack() {
      this.$router.push('/students')
    },
    async loadStudent() {
      if (!this.isEditMode) return
      try {
        const { data } = await axios.get(
          `http://localhost:3000/students/${this.$route.params.ra}`
        )
        this.student = data.data
      } catch (error) {
        console.error('Erro ao carregar aluno:', error)
        const msg = error?.response?.data?.error || 'Aluno não encontrado.'
        this.showSnackbar(msg, 'red')
        this.$router.push('/students')
      }
    },
    generateRandomRa() {
      const min = 100000,
        max = 999999
      return String(Math.floor(Math.random() * (max - min + 1)) + min)
    }
  },
  mounted() {
    if (this.isEditMode) {
      this.loadStudent()
    } else {
      this.student.ra = this.generateRandomRa()
    }
  }
}
</script>
