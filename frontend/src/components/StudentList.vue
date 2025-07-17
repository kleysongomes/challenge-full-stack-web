<template>
  <v-container fluid class="pa-0 pt-12">
    <v-card class="mx-4 pa-4">
      <!-- CABEÇALHO -->
      <v-row align="center" justify="space-between" class="mb-4">
        <!-- Título -->
        <v-col cols="12" sm="4">
          <h2 class="text-h6 font-weight-bold">Consulta de alunos</h2>
        </v-col>

        <!-- Campo de busca centralizado e maior -->
        <v-col cols="12" sm="4" class="d-flex justify-center">
          <v-text-field
            v-model="search"
            placeholder="Digite sua busca"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 400px; width: 100%;"
            @input="filterStudents"
          />
        </v-col>

        <!-- Botão Cadastrar alinhado à direita -->
        <v-col cols="12" sm="4" class="d-flex justify-end">
          <v-btn text small color="primary" @click="goToCreate">
            Cadastrar Aluno
          </v-btn>
        </v-col>
      </v-row>

      <!-- TABELA -->
        <v-data-table
          :headers="headers"
          :items="filteredStudents"
          item-value="ra"
          class="elevation-1"
        >
        <template #item.formattedCpf="{ item }">
          {{ formatCpf(item.cpf) }}
        </template>
        <template #item.actions="{ item }">
          <v-btn size="small" color="blue" variant="text" @click="goToEdit(item.ra)">
            Editar
          </v-btn>
          <v-btn size="small" color="red" variant="text" @click="openDeleteDialog(item)">
            Excluir
          </v-btn>
        </template>
      </v-data-table>

      <!-- DIÁLOGO DE EXCLUSÃO -->
      <v-dialog v-model="deleteDialog" max-width="500">
        <v-card elevation="12">
          <v-card-title class="text-h6">
            <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
            Confirmar exclusão
          </v-card-title>

          <v-card-text>
            <p>Você está prestes a excluir o aluno:</p>
            <p><strong>{{ studentToDelete?.name }}</strong> (RA: {{ studentToDelete?.ra }})</p>
            <p class="text-caption">Esta ação é irreversível.</p>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text color="grey lighten-1" @click="deleteDialog = false">
              Cancelar
            </v-btn>
            <v-btn text color="red darken-1" @click="confirmDelete">
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


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
  name: 'StudentList',
  data() {
    return {
      students: [],
      search: '',
      deleteDialog: false,
      studentToDelete: null,
      snackbar: { show: false, text: '', color: '' },
      headers: [
        { title: 'Registro Acadêmico', value: 'ra' },
        { title: 'Nome',               value: 'name' },
        { title: 'CPF',                value: 'formattedCpf' },
        { title: 'Ações',              value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    filteredStudents() {
      if (!this.search) return this.students
      const term = this.search.toLowerCase()
      return this.students.filter(
        s =>
          s.name.toLowerCase().includes(term) ||
          s.ra.includes(term) ||
          s.cpf.includes(term)
      )
    }
  },
  methods: {
    async fetchStudents() {
      try {
        const { data } = await axios.get('http://localhost:3000/students')
        this.students = data
      } catch (error) {
        const msg = error?.response?.data?.error || 'Erro ao buscar alunos.'
        this.showSnackbar(msg, 'red')
      }
    },
    formatCpf(cpf) {
      const c = cpf.replace(/\D/g, '')
      return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    filterStudents() {
      // já atualiza enquanto digita
      this.fetchStudents()
    },
    goToCreate() {
      this.$router.push('/students/new')
    },
    goToEdit(ra) {
      this.$router.push(`/students/${ra}/edit`)
    },
    openDeleteDialog(student) {
      this.studentToDelete = student
      this.deleteDialog = true
    },
    async confirmDelete() {
      try {
        await axios.delete(
          `http://localhost:3000/students/${this.studentToDelete.ra}`
        )
        this.fetchStudents()
        this.deleteDialog = false
        this.showSnackbar('Aluno excluído com sucesso!')
      } catch (error) {
        const msg = error?.response?.data?.error || 'Erro ao excluir aluno.'
        this.showSnackbar(msg, 'red')
      }
    },
    showSnackbar(text, color = 'green') {
      this.snackbar.text  = text
      this.snackbar.color = color
      this.snackbar.show  = true
    }
  },
  mounted() {
    this.fetchStudents()
  }
}
</script>
